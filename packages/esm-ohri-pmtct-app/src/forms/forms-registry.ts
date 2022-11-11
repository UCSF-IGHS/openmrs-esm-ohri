import labour_and_delivery_v_1_0 from './labour-and-delivery/1.0.json';
import mother_postnatal_v_1_0 from './mother-postnatal/1.0.json';
import infant_postnatal_v_1_0 from './infant-postnatal/1.0.json';
import antenatal_v_1_0 from './antenatal/1.0.json';

export default {
  maternal_health: {
    labour_and_delivery: {
      '1.0': labour_and_delivery_v_1_0,
    },
    mother_postanatal_form: {
      '1.0': mother_postnatal_v_1_0,
    },
  },
  child_health: {
    infant_postnatal: {
      '1.0': infant_postnatal_v_1_0,
      antenatal: {
        '1.0': antenatal_v_1_0,
      },
    },
  },
};
