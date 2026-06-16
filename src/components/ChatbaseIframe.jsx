export default function ChatbaseIframe() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '400px',
        height: '600px',
        zIndex: 9999,
      }}
    >
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/At3ayrCELVQgAV5pXpfSb"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="microphone"
        style={{
          border: 'none',
          borderRadius: '12px',
        }}
      />
    </div>
  );
}