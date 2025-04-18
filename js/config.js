/*******************************************************************************************/
/************************************* Constants Values ************************************/
/*******************************************************************************************/
const sysmonFieldsSchema = {
	"1": [
		"RuleName",
		"UtcTime",
		"ProcessGuid",
		"ProcessId",
		"Image",
		"FileVersion",
		"Description",
		"Product",
		"Company",
		"OriginalFileName",
		"CommandLine",
		"CurrentDirectory",
		"User",
		"LogonGuid",
		"LogonId",
		"TerminalSessionId",
		"IntegrityLevel",
		"Hashes",
		"ParentProcessGuid",
		"ParentProcessId",
		"ParentImage",
		"ParentCommandLine",
		"ParentUser"
	],
	"2": [
		"RuleName",
		"UtcTime",
		"ProcessGuid",
		"ProcessId",
		"Image",
		"TargetFilename",
		"CreationUtcTime",
		"PreviousCreationUtcTime",
		"User"
	],
	"3": [
		"RuleName",
		"UtcTime",
		"ProcessGuid",
		"ProcessId",
		"Image",
		"User",
		"Protocol",
		"Initiated",
		"SourceIsIpv6",
		"SourceIp",
		"SourceHostname",
		"SourcePort",
		"SourcePortName",
		"DestinationIsIpv6",
		"DestinationIp",
		"DestinationHostname",
		"DestinationPort",
		"DestinationPortName"
	],
	"4": [
		"UtcTime",
		"State",
		"Version",
		"SchemaVersion"
	],
	"5": [
		"RuleName",
		"UtcTime",
		"ProcessGuid",
		"ProcessId",
		"Image",
		"User"
	],
	"6": [
		"RuleName",
		"UtcTime",
		"ImageLoaded",
		"Hashes",
		"Signed",
		"Signature",
		"SignatureStatus"
	],
	"7": [
		"RuleName",
		"UtcTime",
		"ProcessGuid",
		"ProcessId",
		"Image",
		"ImageLoaded",
		"FileVersion",
		"Description",
		"Product",
		"Company",
		"OriginalFileName",
		"Hashes",
		"Signed",
		"Signature",
		"SignatureStatus",
		"User"
	],
	"8": [
		"RuleName",
		"UtcTime",
		"SourceProcessGuid",
		"SourceProcessId",
		"SourceImage",
		"TargetProcessGuid",
		"TargetProcessId",
		"TargetImage",
		"NewThreadId",
		"StartAddress",
		"StartModule",
		"StartFunction",
		"SourceUser",
		"TargetUser"
	],
	"9": [
		"RuleName",
		"UtcTime",
		"ProcessGuid",
		"ProcessId",
		"Image",
		"Device",
		"User"
	],
	"10": [
		"RuleName",
		"UtcTime",
		"SourceProcessGUID",
		"SourceProcessId",
		"SourceThreadId",
		"SourceImage",
		"TargetProcessGUID",
		"TargetProcessId",
		"TargetImage",
		"GrantedAccess",
		"CallTrace",
		"SourceUser",
		"TargetUser"
	],
	"11": [
		"RuleName",
		"UtcTime",
		"ProcessGuid",
		"ProcessId",
		"Image",
		"TargetFilename",
		"CreationUtcTime",
		"User"
	],
	"12": [
		"RuleName",
		"EventType",
		"UtcTime",
		"ProcessGuid",
		"ProcessId",
		"Image",
		"TargetObject",
		"User"
	],
	"13": [
		"RuleName",
		"EventType",
		"UtcTime",
		"ProcessGuid",
		"ProcessId",
		"Image",
		"TargetObject",
		"Details",
		"User"
	],
	"14": [
		"RuleName",
		"EventType",
		"UtcTime",
		"ProcessGuid",
		"ProcessId",
		"Image",
		"TargetObject",
		"NewName",
		"User"
	],
	"15": [
		"RuleName",
		"UtcTime",
		"ProcessGuid",
		"ProcessId",
		"Image",
		"TargetFilename",
		"CreationUtcTime",
		"Hash",
		"Contents",
		"User"
	],
	"16": [
		"UtcTime",
		"Configuration",
		"ConfigurationFileHash"
	],
	"17": [
		"RuleName",
		"EventType",
		"UtcTime",
		"ProcessGuid",
		"ProcessId",
		"PipeName",
		"Image",
		"User"
	],
	"18": [
		"RuleName",
		"EventType",
		"UtcTime",
		"ProcessGuid",
		"ProcessId",
		"PipeName",
		"Image",
		"User"
	],
	"19": [
		"RuleName",
		"EventType",
		"UtcTime",
		"Operation",
		"User",
		"EventNamespace",
		"Name",
		"Query"
	],
	"20": [
		"RuleName",
		"EventType",
		"UtcTime",
		"Operation",
		"User",
		"Name",
		"Type",
		"Destination"
	],
	"21": [
		"RuleName",
		"EventType",
		"UtcTime",
		"Operation",
		"User",
		"Consumer",
		"Filter"
	],
	"22": [
		"RuleName",
		"UtcTime",
		"ProcessGuid",
		"ProcessId",
		"QueryName",
		"QueryStatus",
		"QueryResults",
		"Image",
		"User"
	],
	"23": [
		"RuleName",
		"UtcTime",
		"ProcessGuid",
		"ProcessId",
		"User",
		"Image",
		"TargetFilename",
		"Hashes",
		"IsExecutable",
		"Archived"
	],
	"24": [
		"RuleName",
		"UtcTime",
		"ProcessGuid",
		"ProcessId",
		"Image",
		"Session",
		"ClientInfo",
		"Hashes",
		"Archived",
		"User"
	],
	"25": [
		"RuleName",
		"UtcTime",
		"ProcessGuid",
		"ProcessId",
		"Image",
		"Type",
		"User"
	],
	"26": [
		"RuleName",
		"UtcTime",
		"ProcessGuid",
		"ProcessId",
		"User",
		"Image",
		"TargetFilename",
		"Hashes",
		"IsExecutable"
	],
	"27": [
		"RuleName",
		"UtcTime",
		"ProcessGuid",
		"ProcessId",
		"User",
		"Image",
		"TargetFilename",
		"Hashes"
	],
	"28": [
		"RuleName",
		"UtcTime",
		"ProcessGuid",
		"ProcessId",
		"User",
		"Image",
		"TargetFilename",
		"Hashes",
		"IsExecutable"
	],
	"29": [
		"RuleName",
		"UtcTime",
		"ProcessGuid",
		"ProcessId",
		"User",
		"Image",
		"TargetFilename",
		"Hashes"
	]
};

const eventMapping = {
	"ProcessCreate": "1",
	"FileCreateTime": "2",
	"NetworkConnect": "3",
	"ProcessTerminate": "5",
	"DriverLoad": "6",
	"ImageLoad": "7",
	"CreateRemoteThread": "8",
	"RawAccessRead": "9",
	"ProcessAccess": "10",
	"FileCreate": "11",
	"RegistryEvent": "12, 13, 14",
	"FileCreateStreamHash": "15",
	"PipeEvent": "17, 18",
	"WmiEvent": "19, 20, 21",
	"DnsQuery": "22",
	"FileDelete": "23",
	"ClipboardChange": "24",
	"ProcessTampering": "25",
	"FileDeleteDetected": "26",
	"FileBlockExecutable": "27",
	"FileBlockShredding": "28",
	"FileExecutableDetected": "29"
};
  
const sysmonFields = {
	"ProcessCreate": sysmonFieldsSchema["1"],
	"FileCreateTime": sysmonFieldsSchema["2"],
	"NetworkConnect": sysmonFieldsSchema["3"],
	"ProcessTerminate": sysmonFieldsSchema["5"],
	"DriverLoad": sysmonFieldsSchema["6"],
	"ImageLoad": sysmonFieldsSchema["7"],
	"CreateRemoteThread": sysmonFieldsSchema["8"],
	"RawAccessRead": sysmonFieldsSchema["9"],
	"ProcessAccess": sysmonFieldsSchema["10"],
	"FileCreate": sysmonFieldsSchema["11"],

	"RegistryEvent": Array.from(new Set([
		...sysmonFieldsSchema["12"],
		...sysmonFieldsSchema["13"],
		...sysmonFieldsSchema["14"]
	])),
	"FileCreateStreamHash": sysmonFieldsSchema["15"],
	"PipeEvent": Array.from(new Set([
		...sysmonFieldsSchema["17"],
		...sysmonFieldsSchema["18"]
	])),
	"WmiEvent": Array.from(new Set([
		...sysmonFieldsSchema["19"],
		...sysmonFieldsSchema["20"],
		...sysmonFieldsSchema["21"]
	])),
	"DnsQuery": sysmonFieldsSchema["22"],
	"FileDelete": sysmonFieldsSchema["23"],
	"ClipboardChange": sysmonFieldsSchema["24"],
	"ProcessTampering": sysmonFieldsSchema["25"],
	"FileDeleteDetected": sysmonFieldsSchema["26"],
	"FileBlockExecutable": sysmonFieldsSchema["27"],
	"FileBlockShredding": sysmonFieldsSchema["28"],
	"FileExecutableDetected": sysmonFieldsSchema["29"]
};
  
const conditionOptions = [
	"is", "is not", "contains", "contains any", "is any", "contains all",
	"excludes", "excludes any", "excludes all", "begin with", "not begin with", "end with", "not end with", "less than", "more than", "image"
];

const eventInstanceCounters = {};


/*************************************************************************************/
/************************************* Initialize ************************************/
/*************************************************************************************/
document.addEventListener("DOMContentLoaded", () => {
    initializeRuleFunctions();
    initializeModalEvents();
    new Sortable(document.querySelector(".scrollable-container"), {
        animation: 150,
		ghostClass: 'dragging',
		swapThreshold: 0.75,
		fallbackTolerance: 3,
		dragClass: 'drag-active',
		scroll: true, 
		scrollSensitivity: 100, 
		scrollSpeed: 20 
    });
});

function initializeModalEvents() {
    const addRuleGroupBtn = document.getElementById("addBtn");
    const modal = document.getElementById("eventSelectorModal");
    const eventSelector = document.getElementById("eventSelector");
    const confirmAddEvent = document.getElementById("confirmAddEvent");
    const cancelAddEvent = document.getElementById("cancelAddEvent");

    addRuleGroupBtn.addEventListener("click", () => {
        populateEventOptions();
        modal.style.display = "flex";
    });

    cancelAddEvent.addEventListener("click", () => {
        modal.style.display = "none";
    });

    confirmAddEvent.addEventListener("click", () => {
        const selectedEventKey = eventSelector.value;
        addConfigContainer(selectedEventKey);
        modal.style.display = "none";
    });
}

function initializeRuleFunctions() {
    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("plus-icon")) {
            let target = event.target.getAttribute("data-target"); // Include adding / Exclude adding
            let configContainer = event.target.closest(".config-container");
            let eventIndex = configContainer.getAttribute("data-eventkey").split('-')[0];
            let ruleList = target === "include" ?
                configContainer.querySelector(".include-list") :
                configContainer.querySelector(".exclude-list");

            showRuleTypePopup(ruleList, eventIndex);

            ruleList.style.display = "block";
            let parentRow = event.target.closest(".row");
            parentRow.querySelector(".expand-list").style.display = "none";
            parentRow.querySelector(".collapse-list").style.display = "inline";
        }
    });
}

function showRuleTypePopup(ruleList, eventIndex) {
    const popup = document.getElementById("eventSelectorPopup");
    popup.style.display = "flex"; // Show the popup

    const normalBtn = popup.querySelector("#addNormalRule");
    const compoundBtn = popup.querySelector("#addCompoundRule");

    function normalHandler() {
        addNormalRule(ruleList, eventIndex);
        cleanUp();
    }

    function compoundHandler() {
        addCompoundRule(ruleList, eventIndex);
        cleanUp();
    }

    function cleanUp() {
        popup.style.display = "none";
        normalBtn.removeEventListener("click", normalHandler);
        compoundBtn.removeEventListener("click", compoundHandler);
    }

    normalBtn.addEventListener("click", normalHandler);
    compoundBtn.addEventListener("click", compoundHandler);
}

function initializeExpandCollapse() {
	// For rule container expand/collapse
	document.querySelectorAll(".expand-icon").forEach(icon => {
		icon.addEventListener("click", function() {
			let ruleContainer = this.closest(".config-container").querySelector(".rule-container");
			ruleContainer.style.display = "block";
			this.style.display = "none";
			this.nextElementSibling.style.display = "inline";
		});
	});

	document.querySelectorAll(".collapse-icon").forEach(icon => {
		icon.addEventListener("click", function() {
			let ruleContainer = this.closest(".config-container").querySelector(".rule-container");
			ruleContainer.style.display = "none";
			this.style.display = "none";
			this.previousElementSibling.style.display = "inline";
		});
	});

	// For rule list expand/collapse (both in include and exclude rows)
	document.querySelectorAll(".expand-list").forEach(icon => {
		icon.addEventListener("click", function() {
			let ruleList = this.closest(".row").nextElementSibling;
			ruleList.style.display = "block";
			this.style.display = "none";
			// Show collapse-list if exists
			let collapseListIcon = this.parentElement.querySelector(".collapse-list");
			if (collapseListIcon) {
				collapseListIcon.style.display = "inline";
			}
		});
	});

	document.querySelectorAll(".collapse-list").forEach(icon => {
		icon.addEventListener("click", function() {
			let ruleList = this.closest(".row").nextElementSibling;
			ruleList.style.display = "none";
			this.style.display = "none";
			// Show expand-list if exists
			let expandListIcon = this.parentElement.querySelector(".expand-list");
			if (expandListIcon) {
				expandListIcon.style.display = "inline";
			}
		});
	});
}


/*******************************************************************************************/
/************************************* Import / Export  ************************************/
/*******************************************************************************************/
document.getElementById("importBtn").addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    // Accept JSON, XML, and TXT files
    input.accept = ".json, .xml, .txt";

    input.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const container = document.querySelector(".scrollable-container");
            container.innerHTML = "";
            const fileName = file.name.toLowerCase();

            if (fileName.endsWith(".json")) {
                try {
                    const json = JSON.parse(e.target.result);
                    loadSysmonJson(json);
                } catch (err) {
                    console.error("Invalid JSON:", err);
                }
            } else if (fileName.endsWith(".xml")) {
                const xml = e.target.result;
                loadSysmonXML(xml);
            } else if (fileName.endsWith(".txt")) {
                const txt = e.target.result;
                loadSysmonTXT(txt);
            } else {
                console.error("Unsupported file type");
            }
            initializeExpandCollapse();
        };
        reader.readAsText(file);
    });

    input.click();
});


document.getElementById("exportBtn").addEventListener("click", () => {
    // Generate the XML and JSON from your configuration
    const xmlContent = generateSysmonXML();
    const jsonObj = generateSysmonJson();
    const jsonContent = JSON.stringify(jsonObj, null, 2); // pretty print with indentation

    // Create and trigger download for the XML file
    const xmlBlob = new Blob([xmlContent], { type: "application/xml" });
    const xmlUrl = URL.createObjectURL(xmlBlob);
    const xmlAnchor = document.createElement("a");
    xmlAnchor.href = xmlUrl;
    xmlAnchor.download = "sysmon-config.xml";
    document.body.appendChild(xmlAnchor);
    xmlAnchor.click();
    document.body.removeChild(xmlAnchor);
    URL.revokeObjectURL(xmlUrl);

    // // Create and trigger download for the JSON file
    // const jsonBlob = new Blob([jsonContent], { type: "application/json" });
    // const jsonUrl = URL.createObjectURL(jsonBlob);
    // const jsonAnchor = document.createElement("a");
    // jsonAnchor.href = jsonUrl;
    // jsonAnchor.download = "sysmon-config.json";
    // document.body.appendChild(jsonAnchor);
    // jsonAnchor.click();
    // document.body.removeChild(jsonAnchor);
    // URL.revokeObjectURL(jsonUrl);
});



/*********************************************************************************************************/
/************************************* Normal / Compound Rule adding  ************************************/
/*********************************************************************************************************/
function addNormalRule(ruleList, eventIndex) {
    let ruleRow = document.createElement("div");
    ruleRow.classList.add("row", "rule");

    let options = sysmonFields[eventIndex].map(field => `<option value="${field}">${field}</option>`).join("");

    ruleRow.innerHTML = `
        <select class="field-select">${options}</select>
        <label>Name:</label>
        <input type="text" class="rule-name-input" placeholder="Enter value...">
        <label>Condition:</label>
        <select class="condition-select">
            ${conditionOptions.map(opt => `<option value="${opt}">${opt}</option>`).join("")}
        </select>
        <input type="text" class="value-input" placeholder="Condition Value...">
        <span class="material-icons-outlined trash-icon">delete</span>
    `;

    ruleRow.querySelector(".trash-icon").addEventListener("click", () => ruleRow.remove());
    ruleList.appendChild(ruleRow);
}


function addCompoundRule(ruleList, eventIndex) {
    let compoundContainer = document.createElement("div");
    compoundContainer.classList.add("compound-rule-container");

    compoundContainer.innerHTML = `
        <div class="compound-header">
            <label>Compound Rule:</label>
			<input type="text" class="compound-name-input" placeholder="Enter value...">
            <div class="compound-radio-group">
                <input type="radio" name="CombineUsing-${Date.now()}" value="and" checked> And
                <input type="radio" name="CombineUsing-${Date.now()}" value="or"> Or
            </div>
            <span class="material-icons-outlined compound-plus-icon">add_circle_outline</span>
            <span class="material-icons-outlined trash-icon">delete</span>
        </div>
        <div class="compound-conditions"></div>
    `;

    compoundContainer.querySelector(".compound-plus-icon").addEventListener("click", () => {
        addNormalRule(compoundContainer.querySelector(".compound-conditions"), eventIndex);
    });

    compoundContainer.querySelector(".trash-icon").addEventListener("click", () => compoundContainer.remove());

    ruleList.appendChild(compoundContainer);
}




/*******************************************************************************************/
/************************************* Helper Functions ************************************/
/*******************************************************************************************/
function populateEventOptions() {
    const eventSelector = document.getElementById("eventSelector");
    eventSelector.innerHTML = "";
	
    sysmonEvents.forEach(event => {
        const option = document.createElement("option");
        option.value = event.id;
        option.textContent = `${event.num} - ${event.name}`;
        eventSelector.appendChild(option);
    });
}

function addConfigContainer(eventKey) {
    // Track instance number per event type
    if (!eventInstanceCounters[eventKey]) {
        eventInstanceCounters[eventKey] = 1;
    } else {
        eventInstanceCounters[eventKey]++;
    }

    const instanceId = `${eventKey}-${eventInstanceCounters[eventKey]}`;
    const container = document.querySelector(".scrollable-container");
    const eventDetails = sysmonEvents.find(event => event.id === eventKey);
    const displayId = eventDetails ? `${eventDetails.num} - ${eventDetails.name}` : eventKey;

    let configBox = document.createElement("div");
    configBox.classList.add("config-container");
    configBox.setAttribute("data-eventkey", instanceId);

    configBox.innerHTML = `
        <div class="row row-1">
            <label class="label-title">Sysmon Event ID ${displayId}</label>
            <span class="material-icons-outlined trash-icon">delete</span>
			<!-- <label class="switch">
				<input type="checkbox" class="toggle-switch" data-index="${instanceId}">
				<span class="slider round"></span>
			</label> -->
            <span class="material-icons-outlined dropdown-icon expand-icon">expand_more</span>
            <span class="material-icons-outlined dropdown-icon collapse-icon" style="display: none;">expand_less</span>
        </div>
        <div class="rule-container" style="display: none;">
            <div class="row row-2">
                <label for="eventName${instanceId}">Name:</label>
                <input type="text" id="eventName${instanceId}" name="eventName${instanceId}" placeholder="Enter rule name">
                <label>Group Relation:</label>
                <div class="radio-group">
                    <input type="radio" id="relationOr${instanceId}" name="groupRelation${instanceId}" value="or" checked>
                    <label for="relationOr${instanceId}">Or</label>
                    <input type="radio" id="relationAnd${instanceId}" name="groupRelation${instanceId}" value="and">
                    <label for="relationAnd${instanceId}">And</label>
                </div>
            </div>
            <div class="row row-3">
                <label>Include:</label>
                <span class="material-icons-outlined plus-icon" data-target="include">add</span>
                <span class="material-icons-outlined dropdown-icon expand-list">expand_more</span>
                <span class="material-icons-outlined dropdown-icon collapse-list" style="display: none;">expand_less</span>
            </div>
            <div class="rule-list include-list"></div>
            <div class="row row-4">
                <label>Exclude:</label>
                <span class="material-icons-outlined plus-icon" data-target="exclude">add</span>
                <span class="material-icons-outlined dropdown-icon expand-list">expand_more</span>
                <span class="material-icons-outlined dropdown-icon collapse-list" style="display: none;">expand_less</span>
            </div>
            <div class="rule-list exclude-list"></div>
        </div>
    `;

    container.appendChild(configBox);

    // Attach the event to the trash icon in row-1 to remove only this config-container
    const trashIcon = configBox.querySelector(".row-1 .trash-icon");
    trashIcon.addEventListener("click", () => configBox.remove());

    initializeExpandCollapse();

    const includeList = configBox.querySelector(".include-list");
    const excludeList = configBox.querySelector(".exclude-list");

    new Sortable(includeList, {
        animation: 150,
        ghostClass: 'dragging',
        swapThreshold: 0.75,
        fallbackTolerance: 3
    });

    new Sortable(excludeList, {
        animation: 150,
        ghostClass: 'dragging',
        swapThreshold: 0.75,
        fallbackTolerance: 3
    });
}
