// components/Spinner.js

export default function Spinner() {
    return (
      <div
        style={{
          width: '24px',
          height: '24px',
          border: '4px solid #ccc',
          borderTop: '4px solid #0070f3',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: 'auto',
        }}
      />
    );
  }
  