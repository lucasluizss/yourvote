import app from './src/';

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`Server is running on ${port}`));
