/*******************************************************************************************/
/************************************* Constants Values ************************************/
/*******************************************************************************************/
const sysmonEvents = [
    { id: "ProcessCreate", num: "1", name: "ProcessCreate" },
    { id: "FileCreateTime", num: "2", name: "FileCreateTime" },
    { id: "NetworkConnect", num: "3", name: "NetworkConnect" },
    { id: "ProcessTerminate", num: "5", name: "ProcessTerminate" },
    { id: "DriverLoad", num: "6", name: "DriverLoad" },
    { id: "ImageLoad", num: "7", name: "ImageLoad" },
    { id: "CreateRemoteThread", num: "8", name: "CreateRemoteThread" },
    { id: "RawAccessRead", num: "9", name: "RawAccessRead" },
    { id: "ProcessAccess", num: "10", name: "ProcessAccess" },
    { id: "FileCreate", num: "11", name: "FileCreate" },
    { id: "RegistryEvent", num: "12, 13, 14", name: "RegistryEvent" },
    { id: "FileCreateStreamHash", num: "15", name: "FileCreateStreamHash" },
    { id: "PipeEvent", num: "17, 18", name: "PipeEvent" },
    { id: "WmiEvent", num: "19, 20, 21", name: "WmiEvent" },
    { id: "DnsQuery", num: "22", name: "DnsQuery" },
    { id: "FileDelete", num: "23", name: "FileDelete" },
    { id: "ClipboardChange", num: "24", name: "ClipboardChange" },
    { id: "ProcessTampering", num: "25", name: "ProcessTampering" },
    { id: "FileDeleteDetected", num: "26", name: "FileDeleteDetected" },
    { id: "FileBlockExecutable", num: "27", name: "FileBlockExecutable" },
    { id: "FileBlockShredding", num: "28", name: "FileBlockShredding" },
    { id: "FileExecutableDetected", num: "29", name: "FileExecutableDetected" }
];

/****************************************************************************************/
/************************************* Load TXT *****************************************/
/****************************************************************************************/
function loadSysmonTXT(txt) {
	const json = {
		SchemaVersion: null,
		HashAlgorithm: null,
		ActiveDirectory: "",
		CheckRevocation: null,
		CopyOnDeletePE: "false",
		DNSLookup: null,
		FieldSizes: "",
		Rules: []
	};

	let inRuleSection = false; // True after we hit "Rule configuration"
	let currentRule = null; // The currently active event rule
	let currentCompound = null; // The currently active compound rule
	let compoundIndent = null; // The indentation level of the compound-rule header

	const lines = txt.split(/\r?\n/);

	for (let rawLine of lines) {
		const trimmed = rawLine.trim();
		if (!trimmed) continue; // skip empty lines

		const indentMatch = rawLine.match(/^(\s+)/);
		const indentLength = indentMatch ? indentMatch[1].length : 0;

		if (!inRuleSection) {
			if (trimmed.startsWith("Rule configuration")) {
				inRuleSection = true;
				const versionMatch = trimmed.match(/version\s+([\d.]+)/i);
				if (versionMatch) {
					json.SchemaVersion = versionMatch[1];
				}
				continue;
			}

			if (trimmed.startsWith("- HashingAlgorithms:")) {
				const parts = trimmed.split(":", 2);
				json.HashAlgorithm = parts[1] ? parts[1].trim() : "";
				continue;
			} else if (trimmed.startsWith("- Network connection:")) {
				const parts = trimmed.split(":", 2);
				json.NetworkConnection = parts[1] ? parts[1].trim() : "";
				continue;
			} else if (trimmed.startsWith("- Archive Directory:")) {
				const parts = trimmed.split(":", 2);
				json.ArchiveDirectory = parts[1] ? parts[1].trim() : "";
				continue;
			} else if (trimmed.startsWith("- CRL checking:")) {
				const parts = trimmed.split(":", 2);
				let val = parts[1] ? parts[1].trim().toLowerCase() : "";
				json.CheckRevocation = (val === "enabled") ? "true" : "false";
				continue;
			} else if (trimmed.startsWith("- DNS lookup:")) {
				const parts = trimmed.split(":", 2);
				let val = parts[1] ? parts[1].trim().toLowerCase() : "";
				json.DNSLookup = (val === "enabled") ? "true" : "false";
				continue;
			}

			// Ignore other lines until we reach the rule section.
			continue;
		}


		if (/^\s*-\s+[\w]+/.test(rawLine)) {
			if (currentCompound) {
				currentRule.OrderedRules.push(currentCompound);
				currentCompound = null;
				compoundIndent = null;
			}
			if (currentRule) {
				json.Rules.push(currentRule);
				currentRule = null;
			}

			const headerRegex = /^\s*-\s+([\w]+)\s+onmatch:\s+(\w+)(.*)$/;
			const headerMatch = rawLine.match(headerRegex);
			if (headerMatch) {
				currentRule = {
					Event: headerMatch[1],
					EventName: headerMatch[1],
					Action: headerMatch[2].toLowerCase() === "exclude" ? "exclude" : "include",
					GroupRelation: headerMatch[3].toLowerCase().includes("or") ? "or" : "and",
					OrderedRules: []
				};
			}
			continue;
		}

		let compoundHeaderRegex = /^\s*Compound Rule\s+(\S+)\s+combine using\s+(\w+)/i;
		let compoundMatch = trimmed.match(compoundHeaderRegex);
		if (compoundMatch) {
			if (currentCompound) {
				currentRule.OrderedRules.push(currentCompound);
			}
			currentCompound = {
				type: "compound",
				CompoundName: compoundMatch[1],
				CombineUsing: compoundMatch[2].toLowerCase(),
				Conditions: []
			};
			compoundIndent = indentLength;
			continue;
		}

		if (rawLine.includes("filter:") && rawLine.includes("value:")) {
			const conditionRegex = /^\s*(\w+)\s+filter:\s+(.+?)\s+value:\s+'(.+)'/;
			const condMatch = rawLine.match(conditionRegex);
			if (condMatch) {
				const condition = {
					type: "normal",
					RuleName: "",
					Field: condMatch[1],
					FilterType: condMatch[2].trim(),
					Value: condMatch[3].trim()
				};

				if (currentCompound && indentLength > compoundIndent) {
					currentCompound.Conditions.push(condition);
				} else {

					if (currentCompound) {
						currentRule.OrderedRules.push(currentCompound);
						currentCompound = null;
						compoundIndent = null;
					}
					if (currentRule) {
						currentRule.OrderedRules.push(condition);
					}
				}
			}
			continue;
		}

	}

	if (currentCompound) {
		if (currentRule) {
			currentRule.OrderedRules.push(currentCompound);
		}
		currentCompound = null;
	}

	if (currentRule) {
		json.Rules.push(currentRule);
	}

	loadSysmonJson(json);
}


/****************************************************************************************/
/************************************* Load XML *****************************************/
/****************************************************************************************/
function loadSysmonXML(xml) {
	const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(xml, "application/xml");
	const parserErrors = xmlDoc.getElementsByTagName("parsererror");
	if (parserErrors.length > 0) {
		const errorText = parserErrors[0].textContent;
		alert("Error parsing XML:\n" + errorText);
		return;
	}

	const sysmonElem = xmlDoc.getElementsByTagName("Sysmon")[0];
	if (!sysmonElem) {
		alert("No <Sysmon> element found in the XML.");
		return;
	}

	// Build a JSON object for general configuration
	const json = {};
	json.SchemaVersion = sysmonElem.getAttribute("schemaversion") || "";

	// Look for general config elements among the direct children.
	const children = Array.from(sysmonElem.children);
	const findChildText = (tagName) => {
		const elem = children.find(child => child.tagName === tagName);
		return elem ? elem.textContent.trim() : "";
	};

	json.HashAlgorithm = findChildText("HashAlgorithms");
	json.DNSLookup = findChildText("DnsLookup");
	json.CheckRevocation = findChildText("CheckRevocation");
	json.FieldSizes = findChildText("FieldSizes");

	json.ActiveDirectory = "";
	json.CopyOnDeletePE = "";

	json.Rules = [];
	const eventFilteringElem = sysmonElem.getElementsByTagName("EventFiltering")[0];
	if (eventFilteringElem) {
		// Loop through each RuleGroup in the order they appear.
		Array.from(eventFilteringElem.children).forEach(ruleGroupElem => {
			if (ruleGroupElem.tagName !== "RuleGroup") return;
			const groupName = ruleGroupElem.getAttribute("name") || "";
			const groupRelation = ruleGroupElem.getAttribute("groupRelation") || "or";

			Array.from(ruleGroupElem.children).forEach(eventElem => {
				if (eventElem.nodeType !== 1) return;
				const eventType = eventElem.tagName;
				const onmatch = eventElem.getAttribute("onmatch") || "";

				// Create the rule object with a new unified OrderedRules array.
				const rule = {
					Event: eventType,
					EventName: groupName,
					Action: onmatch.toLowerCase(),
					GroupRelation: groupRelation,
					OrderedRules: []
				};

				Array.from(eventElem.children).forEach(childElem => {
					if (childElem.tagName === "Rule") {
						const compoundRule = {
							type: "compound",
							CompoundName: childElem.getAttribute("name") || "",
							CombineUsing: childElem.getAttribute("groupRelation") || "and",
							Conditions: []
						};
						Array.from(childElem.children).forEach(condElem => {
							compoundRule.Conditions.push({
								type: "normal",
								Field: condElem.tagName,
								FilterType: condElem.getAttribute("condition") || "",
								RuleName: condElem.getAttribute("name") || "",
								Value: condElem.textContent.trim()
							});
						});
						rule.OrderedRules.push(compoundRule);
					} else {
						rule.OrderedRules.push({
							type: "normal",
							Field: childElem.tagName,
							FilterType: childElem.getAttribute("condition") || "",
							RuleName: childElem.getAttribute("name") || "",
							Value: childElem.textContent.trim()
						});
					}
				});
				json.Rules.push(rule);
			});
		});
	}

	loadSysmonJson(json);
}


/****************************************************************************************/
/************************************* Load Json ****************************************/
/****************************************************************************************/
function loadSysmonJson(json) {
	const container = document.querySelector(".scrollable-container");
	container.innerHTML = "";

	if (json.SchemaVersion !== undefined) {
		document.getElementById("schemaVersion").value = json.SchemaVersion;
	}
	if (json.HashAlgorithm !== undefined) {
		document.getElementById("hashAlgorithm").value = json.HashAlgorithm;
	}
	if (json.ActiveDirectory !== undefined) {
		document.getElementById("activeDirectory").value = json.ActiveDirectory;
	}
	if (json.CheckRevocation !== undefined) {
		const checkRevEl = document.querySelector(
			'input[name="checkRevocation"][value="' + json.CheckRevocation + '"]'
		);
		if (checkRevEl) checkRevEl.checked = true;
	}
	if (json.CopyOnDeletePE !== undefined) {
		const copyOnDeletePEEl = document.querySelector(
			'input[name="copyOnDeletePE"][value="' + json.CopyOnDeletePE + '"]'
		);
		if (copyOnDeletePEEl) copyOnDeletePEEl.checked = true;
	}
	if (json.DNSLookup !== undefined) {
		const dnsLookupEl = document.querySelector(
			'input[name="dnsLookup"][value="' + json.DNSLookup + '"]'
		);
		if (dnsLookupEl) dnsLookupEl.checked = true;
	}
	if (json.FieldSizes !== undefined) {
		document.getElementById("fieldSizes").value = json.FieldSizes;
	}

	// Reset event instance counters before loading rules
	for (let key in eventInstanceCounters) {
		delete eventInstanceCounters[key];
	}

	// Load each rule container from the JSON rules array
	json.Rules.forEach(rule => {
		const eventId = rule.EventID || getEventId(rule.Event);
		if (!eventId) return;

		addConfigContainer(eventId);

		const instanceCount = eventInstanceCounters[eventId];
		const instanceId = `${eventId}-${instanceCount}`;

		const configContainer = document.querySelector(`.config-container[data-eventkey="${instanceId}"]`);
		if (!configContainer) {
			console.error("Failed to create or locate config container:", instanceId);
			return;
		}

		const ruleContainer = configContainer.querySelector(".rule-container");
		ruleContainer.style.display = "block";

		const expandIcon = configContainer.querySelector(".expand-icon");
		const collapseIcon = configContainer.querySelector(".collapse-icon");
		expandIcon.style.display = "none";
		collapseIcon.style.display = "inline";

		// Set rule name and group relation
		configContainer.querySelector(`#eventName${instanceId}`).value = rule.EventName;
		configContainer.querySelector(
			`#relation${rule.GroupRelation === 'and' ? 'And' : 'Or'}${instanceId}`
		).checked = true;

		const includeList = configContainer.querySelector(".include-list");
		const excludeList = configContainer.querySelector(".exclude-list");

		if (rule.OrderedRules && Array.isArray(rule.OrderedRules)) {
			rule.OrderedRules.forEach(element => {
				if (element.type === "normal") {
					addImportedNormalRule(element, rule.Action, eventId, includeList, excludeList);
				} else if (element.type === "compound") {
					addImportedCompoundRule(element, rule.Action, eventId, includeList, excludeList);
				}
			});
		} else {
			rule.Conditions.forEach(condition => {
				addImportedNormalRule(condition, rule.Action, eventId, includeList, excludeList);
			});

			if (rule.CompoundRules) {
				rule.CompoundRules.forEach(compoundRule => {
					addImportedCompoundRule(compoundRule, rule.Action, eventId, includeList, excludeList);
				});
			}
		}
	});
}

/*******************************************************************************************/
/************************************* Generate Json *************************************/
/*******************************************************************************************/
function generateSysmonJson() {
	const rules = [];

	document.querySelectorAll(".config-container").forEach(configContainer => {
		const instanceId = configContainer.getAttribute("data-eventkey"); 
		const eventType = instanceId.split('-')[0];
		const eventName = configContainer.querySelector(`#eventName${instanceId}`).value;
		const groupRelation = configContainer.querySelector(`#relationAnd${instanceId}`).checked ? "and" : "or";


		const includeListContainer = configContainer.querySelector(".include-list");
		const excludeListContainer = configContainer.querySelector(".exclude-list");

		const orderedIncludeRules = processOrderedRules(includeListContainer);
		const orderedExcludeRules = processOrderedRules(excludeListContainer);

		if (orderedIncludeRules.length > 0) {
			rules.push({
				Event: eventType,
				EventName: eventName,
				Action: "include",
				GroupRelation: groupRelation,
				OrderedRules: orderedIncludeRules
			});
		}

		if (orderedExcludeRules.length > 0) {
			rules.push({
				Event: eventType,
				EventName: eventName,
				Action: "exclude",
				GroupRelation: groupRelation,
				OrderedRules: orderedExcludeRules
			});
		}
	});

	const schemaVersion = document.getElementById("schemaVersion").value;
	const hashAlgorithm = document.getElementById("hashAlgorithm").value;
	const activeDirectory = document.getElementById("activeDirectory").value;
	const checkRevocation = document.querySelector('input[name="checkRevocation"]:checked').value;
	const copyOnDeletePE = document.querySelector('input[name="copyOnDeletePE"]:checked').value;
	const dnsLookup = document.querySelector('input[name="dnsLookup"]:checked').value;
	const fieldSizes = document.getElementById("fieldSizes").value;

	return {
		SchemaVersion: schemaVersion,
		HashAlgorithm: hashAlgorithm,
		ActiveDirectory: activeDirectory,
		CheckRevocation: checkRevocation,
		CopyOnDeletePE: copyOnDeletePE,
		DNSLookup: dnsLookup,
		FieldSizes: fieldSizes,
		Rules: rules
	};
}

/*******************************************************************************************/
/************************************* Generate XML **************************************/
/*******************************************************************************************/
function generateSysmonXML() {
	const data = generateSysmonJson();

	let xml = '<?xml version="1.0" encoding="utf-8"?>\n';
	xml += `<Sysmon schemaversion="${data.SchemaVersion}">\n`;

	if (data.ArchiveDirectory) {
		xml += `  <ArchiveDirectory>${data.ArchiveDirectory}</ArchiveDirectory>\n`;
	}
	if (data.CaptureClipboard) {
		xml += `  <CaptureClipboard>${data.CaptureClipboard}</CaptureClipboard>\n`;
	}
	if (data.DriverName) {
		xml += `  <DriverName>${data.DriverName}</DriverName>\n`;
	}
	if (data.PipeMonitoringConfig) {
		xml += `  <PipeMonitoringConfig>${data.PipeMonitoringConfig}</PipeMonitoringConfig>\n`;
	}
	if (data.HashAlgorithm) {
		xml += `  <HashAlgorithms>${data.HashAlgorithm}</HashAlgorithms>\n`;
	}
	if (data.DNSLookup) {
		xml += `  <DnsLookup>${data.DNSLookup}</DnsLookup>\n`;
	}
	if (data.ProcessAccessConfig) {
		xml += `  <ProcessAccessConfig>${data.ProcessAccessConfig}</ProcessAccessConfig>\n`;
	}
	if (data.CheckRevocation) {
		xml += `  <CheckRevocation>${data.CheckRevocation}</CheckRevocation>\n`;
	}
	if (data.FieldSizes) {
		xml += `  <FieldSizes>${data.FieldSizes}</FieldSizes>\n`;
	}

	if (data.Rules && data.Rules.length > 0) {
		xml += `  <EventFiltering>\n`;

		// Group rules by Event and GroupRelation
		const ruleGroups = {};
		data.Rules.forEach(rule => {
			const key = `${rule.Event}_${rule.GroupRelation}`;
			if (!ruleGroups[key]) {
				ruleGroups[key] = {
					name: rule.EventName,
					groupRelation: rule.GroupRelation,
					rules: []
				};
			}
			ruleGroups[key].rules.push(rule);
		});

		for (const key in ruleGroups) {
			const group = ruleGroups[key];
			xml += `    <RuleGroup name="${group.name}" groupRelation="${group.groupRelation}">\n`;
			group.rules.forEach(rule => {
				xml += `      <${rule.Event} onmatch="${rule.Action.toLowerCase()}">\n`;
				if (rule.OrderedRules && Array.isArray(rule.OrderedRules)) {
					rule.OrderedRules.forEach(item => {
						if (item.type === "normal") {
							xml += `        <${item.Field} condition="${item.FilterType}"`;
							if (item.RuleName && item.RuleName.trim() !== "") {
								xml += ` name="${item.RuleName}"`;
							}
							xml += `>${item.Value}</${item.Field}>\n`;
						} else if (item.type === "compound") {
							xml += `        <Rule groupRelation="${item.CombineUsing}"`;
							if (item.CompoundName && item.CompoundName.trim() !== "") {
								xml += ` name="${item.CompoundName}"`;
							}
							xml += `>\n`;
							item.Conditions.forEach(cond => {
								xml += `          <${cond.Field} condition="${cond.FilterType}"`;
								if (cond.RuleName && cond.RuleName.trim() !== "") {
									xml += ` name="${cond.RuleName}"`;
								}
								xml += `>${cond.Value}</${cond.Field}>\n`;
							});
							xml += `        </Rule>\n`;
						}
					});
				}
				xml += `      </${rule.Event}>\n`;
			});
			xml += `    </RuleGroup>\n`;
		}
		xml += `  </EventFiltering>\n`;
	}

	xml += `</Sysmon>\n`;
	return xml;
}

/*******************************************************************************************/
/************************************* Helper Functions ************************************/
/*******************************************************************************************/
function getEventId(eventName) {
	const event = sysmonEvents.find(e => e.name === eventName);
	return event ? event.id : null;
}

function escapeHTMLAttribute(str) {
	if (!str) return "";
	return String(str)
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

function addImportedNormalRule(condition, action, eventId, includeList, excludeList) {
	const ruleRow = document.createElement("div");
	ruleRow.classList.add("row", "rule");

	const fields = sysmonFields[eventId] || ["Field"];
	const fieldOptions = fields.map(f =>
		`<option value="${f}" ${f === condition.Field ? "selected" : ""}>${f}</option>`
	).join("");

	const condOptions = conditionOptions.map(c =>
		`<option value="${c}" ${c === condition.FilterType ? "selected" : ""}>${c}</option>`
	).join("");

	ruleRow.innerHTML = `
        <select class="field-select">${fieldOptions}</select>
        <label>Name:</label>
        <input type="text" class="rule-name-input" placeholder="Enter value..." value="${escapeHTMLAttribute(condition.RuleName || "")}">
        <label>Condition:</label>
        <select class="condition-select">${condOptions}</select>
        <input type="text" class="value-input" placeholder="Enter value..." value="${escapeHTMLAttribute(condition.Value)}">
        <span class="material-icons-outlined trash-icon">delete</span>
    `;

	ruleRow.querySelector(".trash-icon").addEventListener("click", () => ruleRow.remove());

	const targetList = action.toLowerCase() === "include" ? includeList : excludeList;
	targetList.appendChild(ruleRow);
	targetList.style.display = "block";

	const parentRow = targetList === includeList ?
		includeList.closest(".config-container").querySelector(".row-3") :
		excludeList.closest(".config-container").querySelector(".row-4");

	parentRow.querySelector(".expand-list").style.display = "none";
	parentRow.querySelector(".collapse-list").style.display = "inline";
}

function addImportedCompoundRule(compoundRule, action, eventId, includeList, excludeList) {
	const compoundContainer = document.createElement("div");
	compoundContainer.classList.add("compound-rule-container");

	const uniqueRadioName = `CombineUsing-${Date.now()}-${Math.random().toString(36).substring(7)}`;

	compoundContainer.innerHTML = `
        <div class="compound-header">
            <label>Compound Rule:</label>
            <input type="text" class="compound-name-input" placeholder="Enter value..." value="${escapeHTMLAttribute(compoundRule.CompoundName || "")}">
            <div class="compound-radio-group">
                <input type="radio" name="${uniqueRadioName}" value="and" ${compoundRule.CombineUsing === 'and' ? 'checked' : ''}> And
                <input type="radio" name="${uniqueRadioName}" value="or" ${compoundRule.CombineUsing === 'or' ? 'checked' : ''}> Or
            </div>
            <span class="material-icons-outlined compound-plus-icon">add_circle_outline</span>
            <span class="material-icons-outlined trash-icon">delete</span>
        </div>
        <div class="compound-conditions"></div>
    `;

	const conditionsContainer = compoundContainer.querySelector(".compound-conditions");

	compoundRule.Conditions.forEach(condition => {
		const ruleRow = document.createElement("div");
		ruleRow.classList.add("row", "rule");

		const fields = sysmonFields[eventId] || ["Field"];
		const fieldOptions = fields.map(f =>
			`<option value="${f}" ${f === condition.Field ? "selected" : ""}>${f}</option>`
		).join("");

		const condOptions = conditionOptions.map(c =>
			`<option value="${c}" ${c === condition.FilterType ? "selected" : ""}>${c}</option>`
		).join("");

		ruleRow.innerHTML = `
            <select class="field-select">${fieldOptions}</select>
            <label>Name:</label>
            <input type="text" class="rule-name-input" placeholder="Enter value..." value="${escapeHTMLAttribute(condition.RuleName || "")}">
            <label>Condition:</label>
            <select class="condition-select">${condOptions}</select>
            <input type="text" class="value-input" placeholder="Enter value..." value="${escapeHTMLAttribute(condition.Value)}">
            <span class="material-icons-outlined trash-icon">delete</span>
        `;

		ruleRow.querySelector(".trash-icon").addEventListener("click", () => ruleRow.remove());
		conditionsContainer.appendChild(ruleRow);
	});

	compoundContainer.querySelector(".compound-plus-icon").addEventListener("click", () => {
		addNormalRule(conditionsContainer, eventId);
	});

	compoundContainer.querySelector(".trash-icon").addEventListener("click", () => compoundContainer.remove());

	const targetList = action.toLowerCase() === "include" ? includeList : excludeList;
	targetList.appendChild(compoundContainer);
	targetList.style.display = "block";

	const parentRow = targetList === includeList ?
		includeList.closest(".config-container").querySelector(".row-3") :
		excludeList.closest(".config-container").querySelector(".row-4");

	parentRow.querySelector(".expand-list").style.display = "none";
	parentRow.querySelector(".collapse-list").style.display = "inline";
}

function processOrderedRules(ruleList) {
	return Array.from(ruleList.children).map(child => {
		if (child.classList.contains("rule")) {
			return {
				type: "normal",
				RuleName: child.querySelector(".rule-name-input") ? child.querySelector(".rule-name-input").value : "",
				Field: child.querySelector(".field-select").value,
				FilterType: child.querySelector(".condition-select").value,
				Value: child.querySelector(".value-input").value
			};
		} else if (child.classList.contains("compound-rule-container")) {
			const compoundConditions = Array.from(child.querySelectorAll(".compound-conditions .rule")).map(ruleElem => ({
				RuleName: ruleElem.querySelector(".rule-name-input") ? ruleElem.querySelector(".rule-name-input").value : "",
				Field: ruleElem.querySelector(".field-select").value,
				FilterType: ruleElem.querySelector(".condition-select").value,
				Value: ruleElem.querySelector(".value-input").value
			}));
			return {
				type: "compound",
				CompoundName: child.querySelector(".compound-name-input") ? child.querySelector(".compound-name-input").value : "",
				CombineUsing: child.querySelector(".compound-radio-group input:checked").value,
				Conditions: compoundConditions
			};
		}
	}).filter(item => item !== undefined);
}