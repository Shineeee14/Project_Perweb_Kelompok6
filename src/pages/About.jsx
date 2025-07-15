const About = () => {
  return (
    <div
      style={{
        padding: '20px',
        textAlign: 'center',
        color: '#2c3e50',
      }}
    >
      <div
        style={{
          position: 'relative',
          height: '450px',
          borderRadius: '10px',
          overflow: 'hidden',
          backgroundImage: 'url("/walpaper.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(226, 156, 166, 0.7)', // pink overlay
            zIndex: 1,
          }}
        />
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', position: 'relative', zIndex: 2, marginTop: '0', color: 'white' }}>
          About Us
        </h1>
      </div>
      <p style={{ fontSize: '20px', maxWidth: '600px', margin: '20px auto 0' }}>
        kita adalah sebuah kelompok yang di tugaskan untuk membuat web fornt end
      </p>
    </div>
  );
};

export default About;
