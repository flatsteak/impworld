import { ValidRenderNode } from '../WorldImage/WorldImage';

export class ReusableNodeCache {
  private allNodes = new Set<ValidRenderNode>();
  private cache = new Map<string, Map<string, ValidRenderNode[]>>();

  getReusableNode<T extends ValidRenderNode>(type: new () => T, ids: string[]): T | undefined {
    const typeCache = this.cache.get(type.name);
    if (typeCache === undefined) {
      return undefined;
    }
    for (const id of ids) {
      if (typeCache.has(id)) {
        const node = typeCache.get(id);
        if (node?.length) {
          const reused = node.shift() as T;
          this.allNodes.delete(reused);
          return reused;
        }
      }
    }
    return undefined;
  }

  forEachNode(fn: (node: ValidRenderNode) => void) {
    this.allNodes.forEach((node) => {
      fn(node);
    });
  }

  clear() {
    this.allNodes.clear();
    this.cache.clear();
  }

  addNode(ids: string[], node: ValidRenderNode) {
    this.allNodes.add(node);

    if (!ids?.length) {
      return;
    }

    let typeCache = this.cache.get(node.constructor.name);
    if (typeCache === undefined) {
      typeCache = new Map<string, ValidRenderNode[]>();
      this.cache.set(node.constructor.name, typeCache);
    }
    ids.forEach((id) => {
      let newTypeCache = typeCache!.get(id);
      if (!newTypeCache) {
        newTypeCache = [];
        typeCache!.set(id, newTypeCache);
      }
      if (!newTypeCache.includes(node)) {
        newTypeCache.push(node);
      }
    });
  }
}
