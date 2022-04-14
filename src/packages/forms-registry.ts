import hts_v_1_0 from './hiv/forms/hts/1.0.json';
import hts_v_2_0 from './hiv/forms/hts/2.0.json';
import hts_who_v_1_0 from './hiv/forms/hts-who/1.0.json';
import hiv_service_enrolment_v_1_0 from './hiv/forms/care-and-treatment/service-enrolment/1.0.json';
import hiv_art_therapy_v_1_0 from './hiv/forms/care-and-treatment/art-therapy/1.0.json';
import covid_assessment_form_v_1_0 from './covid/forms/case-assessment-form/1.0.json';
import covid_lab_test_form_v_1_0 from './covid/forms/lab-test-form/1.0.json';
import covid_outcome_tracking_form_v_1_0 from './covid/forms/outcome-tracking-form/1.0.json';
import covid_vaccination_form_v_1_0 from './covid/forms/vaccination-form/1.0.json';
import clinical_visit_v_1_0 from './hiv/forms/care-and-treatment/clinical-visit/1.0.json';
import lab_results_v_1_0 from './hiv/forms/care-and-treatment/lab-results/1.0.json';
import covid_sample_collection_form_v_1_0 from './covid/forms/sample-collection-form/1.0.json';
import covid_lab_order_cancellation_form_v_1_0 from './covid/forms/lab-order-cancellation/1.0.json';
import covid_assessment_summary_v_1_0 from './covid/forms/assessment-summary/1.0.json';
import covid_lab_order_form_v_1_0 from './covid/forms/lab-order-form/1.0.json';
import covid_lab_result_form_v_1_0 from './covid/forms/lab-result-form/1.0.json';
import covid_outcome_form_v_1_0 from './covid/forms/outcome-form/1.0.json';
import covid_case_form_v_1_0 from './covid/forms/case-form/1.0.json';
import death_form_v_1_0 from './hiv/forms/care-and-treatment/death-form/1.0.json';
import transfer_out_v_1_0 from './hiv/forms/care-and-treatment/transfer-out/1.0.json';
import patient_tracing_v_1_0 from './hiv/forms/care-and-treatment/patient-tracing/1.0.json';
import intimate_partner_v_1_0 from './hiv/forms/care-and-treatment/intimate-partner/1.0.json';
import contact_tracing_v_1_0 from './hiv/forms/care-and-treatment/contact-tracing/1.0.json';
import service_delivery_v_1_0 from './hiv/forms/care-and-treatment/service-delivery/1.0.json';
import peads_disclosure_v_1_0 from './hiv/forms/care-and-treatment/Pead-Dislosure/1.0.json';
import patner_notification_v_1_0 from './hiv/forms/care-and-treatment/patner-notification/1.0.json';
import mental_health_assessment_v_1_0 from './hiv/forms/care-and-treatment/mental-health/1.0.json';

export default {
  hiv: {
    hts: {
      '1.0': hts_v_1_0,
      '2.0': hts_v_2_0,
    },
    hts_who: {
      '1.0': hts_who_v_1_0,
    },
    service_enrolment: {
      '1.0': hiv_service_enrolment_v_1_0,
    },
    clinical_visit: {
      '1.0': clinical_visit_v_1_0,
    },
    lab_results: {
      '1.0': lab_results_v_1_0,
    },
    death_form: {
      '1.0': death_form_v_1_0,
    },
    art_therapy: {
      '1.0': hiv_art_therapy_v_1_0,
    },
    transfer_out: {
      '1.0': transfer_out_v_1_0,
    },
    patient_tracing: {
      '1.0': patient_tracing_v_1_0,
    },
    intimate_partner: {
      '1.0': intimate_partner_v_1_0,
    },
    contact_tracing: {
      '1.0': contact_tracing_v_1_0,
    },
    service_delivery: {
      '1.0': service_delivery_v_1_0,
    },
    peads_disclosure: {
      '1.0': peads_disclosure_v_1_0,
    },
    patner_notification: {
      '1.0': patner_notification_v_1_0,
    },
    mental_health_assessment: {
      '1.0': mental_health_assessment_v_1_0,
    },
  },
  covid: {
    covid_assessment: {
      '1.0': covid_assessment_form_v_1_0,
    },
    covid_lab_test: {
      '1.0': covid_lab_test_form_v_1_0,
    },
    covid_outcome_tracking: {
      '1.0': covid_outcome_tracking_form_v_1_0,
    },
    covid_vaccination: {
      '1.0': covid_vaccination_form_v_1_0,
    },
    covid_sample_collection: {
      '1.0': covid_sample_collection_form_v_1_0,
    },
    covid_lab_order_cancellation: {
      '1.0': covid_lab_order_cancellation_form_v_1_0,
    },
    covid_assessment_summary: {
      '1.0': covid_assessment_summary_v_1_0,
    },
    covid_lab_order: {
      '1.0': covid_lab_order_form_v_1_0,
    },
    covid_lab_result: {
      '1.0': covid_lab_result_form_v_1_0,
    },
    covid_outcome: {
      '1.0': covid_outcome_form_v_1_0,
    },
    covid_case: {
      '1.0': covid_case_form_v_1_0,
    },
  },
};
