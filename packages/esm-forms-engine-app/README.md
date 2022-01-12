# OHRI Forms ESM 

A custom microfrontend for loading Forms with the OpenMRS HIV Reference Implementation (OHRI)

## Syntax
The forms are loaded using URLs. 

```sh
openmrs/spa/<package>/<form>/<patientUUID>?encounterUUID=<value>&mode=<value>&intent=<value>
```

Where:
- *package:* Valid name of form package
- *form:* Valid name of a form in the specified package
- *patientUUID: UUID of the patient whose form is being accessed

Optionals:
- *mode:* Mode of the form. One of *edit*, *view*, and *enter (default)*
- *encounterUUID:* UUID of the encounter (only necessary for view and edit modes)
- *intent:* Valid form intent. Default is * * *
