
import hiv_retro_v_1_0 from './hiv/forms/hts/1.0.json';
import hiv_retro_v_2_0 from './hiv/forms/hts/2.0.json';
import hiv_service_enrolment_v_1_0 from './hiv/forms/care-and-treatment/service-enrolment/1.0.json';

export default {
  hiv: {
    hts_retro: {
      '1.0': hiv_retro_v_1_0,
      '2.0': hiv_retro_v_2_0,
    },
    service_enrolment: {
      '1.0': hiv_service_enrolment_v_1_0,
    },
  },
};
