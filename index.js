import axios from 'axios';

const BASE_URL = 'https://nodes-on-nodes-challenge.herokuapp.com/nodes';

(async () => {
  let currentIds = ['089ef556-dfff-4ff2-9733-654645be56fe'];

  const uniqueNodeIds = new Set(currentIds);
  const visited = new Set();
  const frequency = {};

  while (currentIds.length > 0) {
    const { data: nodes } = await axios.get(
      `${BASE_URL}/${currentIds.join(',')}`
    );
    const childNodeIds = nodes.flatMap((node) => node.child_node_ids);

    // use a set to find all unique node ids
    nodes.forEach((node) => uniqueNodeIds.add(node.id));

    // update the frequency at which each node appears as a child
    childNodeIds.forEach((id) => (frequency[id] = (frequency[id] || 0) + 1));

    // keep track of visited to detect cycles
    currentIds.forEach((nodeId) => visited.add(nodeId));
    // set the next list of ids to request
    currentIds = childNodeIds.filter((childNodeId) => {
      const alreadyVisited = visited.has(childNodeId);
      if (alreadyVisited) {
        console.log('cycle detected', childNodeId);
      }
      return !alreadyVisited;
    });
  }

  let mostFrequent = 0;
  let mostFrequentId = undefined;
  Object.entries(frequency).forEach(([id, freq]) => {
    if (freq > mostFrequent) {
      mostFrequent = freq;
      mostFrequentId = id;
    }
  });

  console.log('What is the total number of unique nodes?', uniqueNodeIds.size);
  console.log(
    'Which node ID is shared the most among all other nodes?',
    mostFrequentId,
    mostFrequent
  );
})();
