
import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card"
function App() {

  const [totalSpent, setTotalSpent] = useState(0)

useEffect(() => {
  async function fetchTotalSpent() {
    try {
      const res = await fetch("/api/expenses/total-spent");

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const text = await res.text(); // Read response as text
      console.log("Raw Response:", text); // Debugging

      const data = JSON.parse(text); // Parse manually

      setTotalSpent(data.total);
    } catch (error) {
      console.error("Error fetching total spent:", error);
    }
  }

  fetchTotalSpent();
}, []);


  return (
    <Card className="w-[350px] m-auto">
    <CardHeader>
      <CardTitle>Total Spent</CardTitle>
      <CardDescription>The total amount you'v spent .</CardDescription>
    </CardHeader>
    <CardContent>{totalSpent} </CardContent>
  </Card>
  )
}

export default App
