import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextArea({ className = '', isFocused = false, ...props }, ref) {
  const textArea = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      textArea.current.focus();
    }
  }, []);

  return (
    <textarea
      {...props}
      className={'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' + className}
      ref={textArea}
    ></textarea>
  );
});
