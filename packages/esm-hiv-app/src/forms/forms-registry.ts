import hts_v_1_0 from './hts/1.0.json';
import hts_v_2_0 from './hts/2.0.json';
import hts_who_v_1_0 from './hts-who/1.0.json';
import hiv_service_enrolment_v_1_0 from './care-and-treatment/service-enrolment/1.0.json';
import hiv_service_enrolment_v_1_1 from './care-and-treatment/service-enrolment/1.1.json';
import hiv_art_therapy_v_1_0 from './care-and-treatment/art-therapy/1.0.json';
import clinical_visit_v_1_0 from './care-and-treatment/clinical-visit/1.0.json';
import clinical_visit_v_2_0 from './care-and-treatment/clinical-visit/2.0.json';
import lab_results_v_1_0 from './care-and-treatment/lab-results/1.0.json';
import death_form_v_1_0 from './care-and-treatment/death-form/1.0.json';
import transfer_out_v_1_0 from './care-and-treatment/transfer-out/1.0.json';
import patient_tracing_v_1_0 from './care-and-treatment/patient-tracing/1.0.json';
import intimate_partner_v_1_0 from './care-and-treatment/intimate-partner/1.0.json';
import contact_tracing_v_1_0 from './care-and-treatment/contact-tracing/1.0.json';
import service_delivery_v_1_0 from './care-and-treatment/service-delivery/1.0.json';
import peads_disclosure_v_1_0 from './care-and-treatment/Pead-Dislosure/1.0.json';
import patner_notification_v_1_0 from './care-and-treatment/partner-notification/1.0.json';
import mental_health_assessment_v_1_0 from './care-and-treatment/mental-health/1.0.json';
import cd4_lab_results_v_1_0 from './care-and-treatment/cd4-lab-results/1.0.json';
import viral_load_results_v_1_0 from './care-and-treatment/viral-load-results/1.0.json';
import viral_load_request_v_1_0 from './care-and-treatment/viral-load-request/1.0.json';
import lab_specimen_collection_v_1_0 from './care-and-treatment/lab-specimen-collection/1.0.json';

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
      '1.1': hiv_service_enrolment_v_1_1,
    },
    clinical_visit: {
      '1.0': clinical_visit_v_1_0,
      '2.0': clinical_visit_v_2_0,
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
    cd4_lab_results: {
      '1.0': cd4_lab_results_v_1_0,
    },
    viral_load_results: {
      '1.0': viral_load_results_v_1_0,
    },
    viral_load_request: {
      '1.0': viral_load_request_v_1_0,
    },
    lab_specimen_collection: {
      '1.0': lab_specimen_collection_v_1_0,
    },
  },
};
