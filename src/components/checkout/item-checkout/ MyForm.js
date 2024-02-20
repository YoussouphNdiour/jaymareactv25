import { useState } from 'react';

const MyForm = ({ onSubmit }) => {
  const [numeroClient, setNumeroClient] = useState('');
  const [otp, setOtp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Appel de la fonction onSubmit avec les valeurs des champs
    onSubmit({ numeroClient, otp });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="numero_client">Numero téléphone:</label>
        <input
          type="number"
          id="numero_client"
          value={numeroClient}
          onChange={(e) => setNumeroClient(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="otp">OTP:</label>
        <input
          type="number"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
