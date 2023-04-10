export const queryKey = (queryKey: (...args: any) => unknown[]) => {
  return (target: any, propertyKey: string) => {
    return Object.assign(target[propertyKey], { queryKey });
  };
};
