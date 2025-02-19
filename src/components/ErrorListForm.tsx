import Alert from "@mui/material/Alert";

interface ErrorListFormProps {
  errors: string[];
}

export default function ErrorListForm({ errors }: ErrorListFormProps) {
  if (errors.length === 0) return null; // Se não houver erros, não renderiza nada.

  return (
    <Alert style={{marginTop:'15px', marginBottom: '15px'}} severity="error">
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </Alert>
  );
}
