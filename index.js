import axios from 'axios';

const BASE_URL = 'https://nodes-on-nodes-challenge.herokuapp.com/nodes';

(async () => {
  let currentId = '089ef556-dfff-4ff2-9733-654645be56fe';

  const { data } = await axios.get(`${BASE_URL}/${currentId}`);

  console.log(data);
})();
