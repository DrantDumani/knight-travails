class GraphNode {
  constructor(vertex) {
    this.vertex = vertex;
    this.edges = [];
    this.path = [vertex];
  }
}

function validateMove(startNode, moveBy) {
  let { vertex } = startNode;
  let nextMove = [vertex[0] + moveBy[0], vertex[1] + moveBy[1]];
  if ((nextMove[0]) > 7 || (nextMove[0]) < 0
    || (nextMove[1]) > 7 || (nextMove[1]) < 0
    || startNode.edges.some((el) => el[0] === nextMove[0] && el[1] === nextMove[1])) {
    return false;
  }
  return true;
}

function knightMoves(start, end) {
  let current = new GraphNode(start);
  const queue = [start];
  const moves = [
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
    [2, 1],
    [1, 2],
    [-2, 1],
    [-1, 2],
  ];

  while (queue.length > 0) {
    for (let move of moves) {
      if (validateMove(current, move)) {
        const [currX, currY] = current.vertex;
        const [x, y] = move;
        const node = new GraphNode([currX + x, currY + y]);
        node.path = current.path.concat([node.vertex]);
        node.edges.push(current.vertex);
        if (((current.vertex[0] === end[0]) && (current.vertex[1] === end[1]))) {
          console.log(`The shortest path is ${current.path.length - 1} moves!`);
          return current.path;
        }
        current.edges.push(node.vertex);
        queue.push(node);
      }
    }
    queue.shift();
    [current] = queue;
  }
}

console.log(knightMoves([0, 0], [7, 7]));
console.log(knightMoves([0, 0], [3, 3]));
console.log(knightMoves([3, 3], [4, 3]));
