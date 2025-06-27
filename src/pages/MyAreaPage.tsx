import { useEffect, useState } from "react";
import { Container, Typography, Avatar, Box } from "@mui/material";
import { parseJwt } from "../utils/jwtUtils";
import { getCustomerById } from "../services/user.service";

export const MyAreaPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const userInfo = parseJwt(token);

    // הוצאת ה-ID מהמפתח המדויק
    const idString = userInfo?.CustomerId;
    const id = idString ? parseInt(idString) : null;

    if (!id) return;

    setUserId(id);

    getCustomerById(id).then((data) => {
      setFullName(data.fullName || data.FullName);
      setEmail(data.email || data.Email);
    });
  }, []);

  return (
    <Container sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        שלום {fullName}, ברוך הבא לאזור האישי!
      </Typography>
      <Typography variant="body1" gutterBottom>
        האימייל שלך: {email}
      </Typography>

      {userId && (
        <Box sx={{ mt: 3 }}>
        <Avatar
  alt="Profile"
src={`https://localhost:7091/api/customer/image/${userId}`}
  sx={{ width: 120, height: 120, margin: "0 auto" }}
/>

        </Box>
      )}
    </Container>
  );
};
