import * as React from 'react';

export interface ISpinnerProps {
    loading: boolean;
    style?: any
}

function Spinner ({loading}: ISpinnerProps) {
  return (
    <>
        {loading && (
            <div>
                <div 
                    style={{borderTopColor:'transparent'}}
                    className="w-16 h-16 border-4 border-blue-400 border-solid rounded-full animate-spin duration-200"
                ></div>
            </div>
        )}
    </>
  );
}

export default Spinner