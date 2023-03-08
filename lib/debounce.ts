export default function debounce(
  callback: Function,
  delay: number,
  immediate = false
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  // Note: We can't use an arrow function for the returned function b/c
  //       arrow functions don't get their own 'this' context and in this case we need that so
  //       that we can in-turn set the 'this' context for the underlying callback with ".apply()"
  return function (this: unknown, ...args: any) {
    timeoutId && clearTimeout(timeoutId);

    const shouldCallImmediately = timeoutId === null && immediate;
    if (shouldCallImmediately) {
      callback.apply(this, args);
    }
    timeoutId = setTimeout(() => {
      if (!immediate) {
        callback.apply(this, args);
      }
      timeoutId = null;
    }, delay);
  };
}
