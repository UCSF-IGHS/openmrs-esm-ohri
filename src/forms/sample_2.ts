

const sample_2 = {
	"name": "POC HIV Testing Services Demo by Grace",
	"pages": [
		{
			"label": "HIV Testing Service Workflow",
			"sections": [
				{
					"label": "Patient Details",
					"isExpanded": "true",
					"questions": [
						{
							"label": "Patient Consent",
							"type": "obs",
							"questionOptions": {
								"rendering": "radio",
								"concept": "1710AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
								"conceptMappings": [
									{
										"type": "SNOMED-CT",
										"value": "182771004"
									}
								],
								"answers": [
									{
										"label": "yes",
										"concept": "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
									},
									{
										"label": "no",
										"concept": "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
									}
								]
							},
							"id": "informed-consent"
						},
						{
							"label": "Date of HIV Test",
							"type": "obs",
							"questionOptions": {
								"rendering": "date",
								"concept": "164400AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
								"weeksList": ""
							},
							"id": "hivtestdate"
						}
					]
				},
				{
					"label": "HIV Testing",
					"isExpanded": "true",
					"questions": [
						{
							"label": "HIV Test 1",
							"type": "obs",
							"questionOptions": {
								"rendering": "radio",
								"concept": "1040AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
								"conceptMappings": [
									{
										"type": "PIH",
										"value": "1040"
									},
									{
										"type": "LOINC",
										"value": "49483-1"
									},
									{
										"type": "AMPATH",
										"value": "1040"
									},
									{
										"type": "SNOMED-CT",
										"value": "409788009"
									},
									{
										"type": "LOINC",
										"value": "5220-9"
									}
								],
								"answers": [
									{
										"concept": "664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
										"label": "Negative",
										"conceptMappings": [
											{
												"type": "AMPATH",
												"value": "664"
											},
											{
												"type": "SNOMED-CT",
												"value": "260385009"
											},
											{
												"type": "PIH",
												"value": "664"
											},
											{
												"type": "org.openmrs.module.mdrtb",
												"value": "NEGATIVE"
											},
											{
												"type": "AMPATH",
												"value": "665"
											}
										]
									},
									{
										"concept": "703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
										"label": "Positive",
										"conceptMappings": [
											{
												"type": "PIH",
												"value": "703"
											},
											{
												"type": "AMPATH",
												"value": "703"
											},
											{
												"type": "AMPATH",
												"value": "704"
											},
											{
												"type": "SNOMED-CT",
												"value": "10828004"
											},
											{
												"type": "org.openmrs.module.mdrtb",
												"value": "POSITIVE"
											}
										]
									},
									{
										"concept": "1304AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
										"label": "Poor Sample Quality",
										"conceptMappings": [
											{
												"type": "SNOMED-MVP",
												"value": "13041000105002"
											},
											{
												"type": "AMPATH",
												"value": "1304"
											},
											{
												"type": "SNOMED-NP",
												"value": "123038009"
											}
										]
									}
								]
							},
							"id": "HIVtest1"
						},
						{
							"label": "HIV Test 2",
							"type": "obs",
							"questionOptions": {
								"rendering": "radio",
								"concept": "1326AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
								"conceptMappings": [
									{
										"type": "AMPATH",
										"value": "1326"
									}
								],
								"answers": [
									{
										"concept": "703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
										"label": "Positive",
										"conceptMappings": [
											{
												"type": "PIH",
												"value": "703"
											},
											{
												"type": "AMPATH",
												"value": "703"
											},
											{
												"type": "AMPATH",
												"value": "704"
											},
											{
												"type": "SNOMED-CT",
												"value": "10828004"
											},
											{
												"type": "org.openmrs.module.mdrtb",
												"value": "POSITIVE"
											}
										]
									},
									{
										"concept": "664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
										"label": "Negative",
										"conceptMappings": [
											{
												"type": "AMPATH",
												"value": "664"
											},
											{
												"type": "SNOMED-CT",
												"value": "260385009"
											},
											{
												"type": "PIH",
												"value": "664"
											},
											{
												"type": "org.openmrs.module.mdrtb",
												"value": "NEGATIVE"
											},
											{
												"type": "AMPATH",
												"value": "665"
											}
										]
									},
									{
										"concept": "1304AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
										"label": "POOR SAMPLE QUALITY",
										"conceptMappings": [
											{
												"type": "SNOMED-MVP",
												"value": "13041000105002"
											},
											{
												"type": "AMPATH",
												"value": "1304"
											},
											{
												"type": "SNOMED-NP",
												"value": "123038009"
											}
										]
									}
								]
							},
							"id": "HIVtest2"
						}
					]
				}
			]
		}
	],
	"processor": "EncounterFormProcessor",
	"uuid": "xxxx",
	"referencedForms": []
}