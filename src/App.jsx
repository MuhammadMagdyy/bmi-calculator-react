import { useState, useEffect } from 'react'

const App = () => {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState('metric') // 'metric' or 'imperial'
  const [history, setHistory] = useState([])
  const [result, setResult] = useState(null)

  const calculateBMI = () => {
    if (!height || !weight) return

    let bmiValue
    if (unit === 'metric') {
      const heightInMeters = height / 100
      bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1)
    } else {
      // Imperial formula: (lbs / inches^2) * 703
      bmiValue = ((weight / (height * height)) * 703).toFixed(1)
    }

    let cat = ''
    let tip = ''
    if (bmiValue < 18.5) {
      cat = 'Underweight'; tip = 'Try to include more nutrient-dense foods.'
    } else if (bmiValue < 25) {
      cat = 'Normal'; tip = 'Great job! Maintain your current lifestyle.'
    } else if (bmiValue < 30) {
      cat = 'Overweight'; tip = 'Consider more physical activity and balanced portions.'
    } else {
      cat = 'Obese'; tip = 'Consult with a healthcare provider for a personalized plan.'
    }

    const newResult = { bmi: bmiValue, category: cat, tip, date: new Date().toLocaleTimeString() }
    setResult(newResult)
    setHistory([newResult, ...history].slice(0, 5)) // Keep last 5
  }

  const resetFields = () => {
    setHeight(''); setWeight(''); setResult(null)
  }

  return (
    <div className="container">
      <h1> BMI Calculator </h1>

      {/* Unit Toggle */}
      <div className="unit-toggle">
        <button className={unit === 'metric' ? 'active' : ''} onClick={() => {setUnit('metric'); resetFields()}}>Metric</button>
        <button className={unit === 'imperial' ? 'active' : ''} onClick={() => {setUnit('imperial'); resetFields()}}>Imperial</button>
      </div>

      <label> {unit === 'metric' ? 'Height (cm)' : 'Height (inches)'} </label>
      <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Enter height" />
      
      <label> {unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'} </label>
      <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Enter weight" />

      <div className="button-group">
        <button onClick={calculateBMI} className="calc-btn">Calculate</button>
        <button onClick={resetFields} className="reset-btn">Reset</button>
      </div>

      {result && (
        <div className={`result-box ${result.category.toLowerCase()}`}>
          <h2>{result.bmi}</h2>
          <p><strong>{result.category}</strong></p>
          <small>{result.tip}</small>
        </div>
      )}

      {history.length > 0 && (
        <div className="history">
          <h3>Recent History</h3>
          {history.map((item, index) => (
            <div key={index} className="history-item">
              <span>{item.date}</span> — <strong>{item.bmi}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App