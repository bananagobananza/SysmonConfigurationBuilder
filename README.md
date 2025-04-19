<div align="center">
  <h2 align="center">SysmonConfigurationBuilder</h3>

  <p align="center">
    A Node.js-based web application to simplify the creation, editing, and validation of Sysmon configuration files.
    <br />
    <br />
    <!-- <a href="https://github.com/teebow1e/loganalyz3r/blob/main/README.md#features-demo">View Demo</a>
    ·
    <a href="https://github.com/teebow1e/project1-soict/issues">Report Bug</a> -->
  </p>
</div>

## About Sysmon Configuration Builder
The Sysmon Configuration Builder is a web application designed to streamline the process of authoring and managing Sysmon configuration files. Sysmon, a powerful tool from Microsoft's Sysinternals suite, enhances Windows system monitoring by logging detailed events for threat detection and incident response. However, crafting effective Sysmon XML configurations can be complex due to intricate rule ordering and filtering logic. This application addresses these challenges by providing an intuitive interface for users to import, edit, and export valid Sysmon configurations, making the process accessible to users with varying expertise.

Developed as part of the Project 2 course by the School of Information and Communication Technology (SoICT) at Hanoi University of Science and Technology (HUST) and Research & Deveopment at VNPT-IT, this application leverages Node.js for the backend and HTML, CSS, and JavaScript for the frontend. It was tested using the Sliver C2 framework to validate configurations against simulated adversarial behaviors, ensuring their effectiveness in detecting Indicators of Compromise (IoCs).

## Features
- **Configuration Import:** Import Sysmon configurations in XML or TXT formats for easy editing.
- **Dynamic Rule Editing:** Add, modify, or delete RuleGroups, rules, and compound rules with dynamic forms supporting all Sysmon event types (Event IDs 1-29).
- **Drag-and-Drop Reordering:** Reorder RuleGroups, rules, and compound rules to ensure correct Sysmon rule precedence using SortableJS.
- **Configuration Export:** Export configurations as valid XML files, ready for use with Sysmon.
- **Validation Support:** Ensures configurations adhere to Sysmon’s schema and best practices, reducing errors like logical operator inconsistencies.
- **Adversary Emulation Testing:** Validated using the Sliver C2 framework to detect IoCs such as process creation, network connections, registry modifications, and file operations. (Report)

## Features Demo
### Import Configuration
https://github.com/user-attachments/assets/a8f8cb4b-abd2-4ab0-9001-f9ede398debe
### Edit Configuration
#### Add RuleGroup:
https://github.com/user-attachments/assets/3e6bbe68-ac38-4062-bf1d-a4b5048bce81
#### Add Rule/Compound Rule:
https://github.com/user-attachments/assets/f06b4f0f-ffcc-42cb-a69c-71fd0abea0a9
#### Arrange Rules:
https://github.com/user-attachments/assets/1c148489-265d-4813-9463-41e1c8d4b423
### Export Configuration
https://github.com/user-attachments/assets/9a0d81ce-9391-4f9d-81dc-539b94cdfbc0

## Code Structure
```
├── css
│   └── (Styling files for the web interface)
├── example
│   └── (Sample Sysmon XML configuration files)
├── js
│   ├── config.js (Dynamic field mapping, UI logic, import/export)
│   ├── configData.js (Data parsing, format conversion, rule reconstruction)
│   └── (Other client-side scripts)
├── node_modules
│   └── (Third-party libraries and dependencies)
├── index.html
│   └── (Main HTML entry point for the web interface)
├── package.json
│   └── (Project metadata and dependencies)
├── package-lock.json
│   └── (Dependency lock file)
├── README.md
│   └── (Project documentation)
└── server.js
    └── (Node.js backend script for HTTP requests and static file serving)
```
## Usage
Download the project folder directly from github.

## Build
> In order to run this project, you must have `Nodejs` 

### Build and Run
```sh
npm install
npm run dev
```

## License
Distributed under the MIT License. See [`LICENSE`](https://github.com/bananagobananza/SysmonConfigurationBuilder/blob/main/LICENSE) for more information.

## Contact
This project is maintained by 1 moderators:
- QuanPH - [@FieryPhoenix](https://www.facebook.com/quan.phamhong.98871) - quan.ph225551@sis.hust.edu.vn/hongquan090804@gmail.com

