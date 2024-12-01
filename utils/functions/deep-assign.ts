export function deepAssign(target: any, ...sources: any[]): any {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepAssign(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepAssign(target, ...sources);
}

function isObject(item: unknown): item is Record<string, any> {
  return (!!item && typeof item === "object" && !Array.isArray(item));
}

// Example usage
if (import.meta.main) {
  const obj1 = {
    a: 1,
    b: {
      c: 2,
      d: {
        e: 3,
      },
    },
  };

  const obj2 = {
    b: {
      d: {
        f: 4,
      },
      g: 5,
    },
    h: 6,
  };

  const result = deepAssign({}, obj1, obj2);
  console.log(JSON.stringify(result, null, 2));
}
