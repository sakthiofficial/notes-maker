import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function ThankYouPage() {
  return (
    <Grid
      conatiner
      xs={12}
      sx={{
        justifyContent: "center",
      }}
    >
      <Grid item xs={8} sx={{ marginTop: "12%" }}>
        <Typography
          component="h1"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 0",
            fontSize: "36px",
            fontWeight: "bold",
            color: "#339966",
          }}
        >
          Thank you!
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography
          component="h2"
          sx={{
            textAlign: "center",
            padding: "10px 0",
            fontSize: "14px",
            color: "#333",
          }}
        >
          Thank You For Your Interest in Urbanrise The World Of Joy! Very soon
          one of our associates will get in touch with you and make your dream
          home come true in no time!
        </Typography>
      </Grid>
    </Grid>
  );
}
