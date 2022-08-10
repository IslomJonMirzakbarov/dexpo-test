import { useEffect, useRef } from 'react';

const useDidMount = (f, conditions) => {
  const didMountRef = useRef(false);
  console.log(didMountRef);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    // Cleanup effects when f returns a function
    return f && f(); //eslint-disable-line
  }, conditions);
};

export default useDidMount;
