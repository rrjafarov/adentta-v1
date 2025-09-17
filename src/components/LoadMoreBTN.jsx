// import React from "react";

// const LoadMoreBTN = ({t,linkTitle}) => {
//   return (
//     <div className="loadMoreBtn">
//       <button >
//         {/* {linkTitle || "Load More"} */}
//         {t?.loadMoreBTN || "Load More"}
//       </button>
//     </div>
//   );
// };

// export default LoadMoreBTN;





import React from 'react';

const LoadMoreBTN = ({ disabled = false, onClick, children = "Load More" }) => {
  return (
    <button 
      className={`load-more-btn ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '12px 24px',
        backgroundColor: disabled ? '#ccc' : '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '16px',
        fontWeight: '500',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.3s ease'
      }}
    >
      {disabled ? 'Loading...' : children}
    </button>
  );
};

export default LoadMoreBTN;