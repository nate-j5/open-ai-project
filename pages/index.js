import { useState } from "react";
import styles from '../styles/Home.module.css'

export default function Home() {
  const [cityInput, setCityInput] = useState("");
  const [result, setResult] = useState();
  const [items, setItems] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city: cityInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setItems([...items, {
      id: items.length,
      city: cityInput,
      response: data.result
    }])
    setCityInput("");
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.formContainer}>

            <img src="/city.png" className={styles.image} />
            <h3>Historic Moments for Cities </h3>

            <form onSubmit={onSubmit} className={styles.form}>
              <input
                type="text"
                className={styles.formInput}
                name="city"
                placeholder="Enter a city"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
              />
              <input
                type="submit"
                className={styles.submit}
                value="Submit"
              />
            </form>
          </div>
        </div>

        <div className={styles.resultsContainer}>
          <ul>
            {items.map((item, index) => <li key={index}> {index + 1}). {item.city.toUpperCase()} --- {item.response}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}