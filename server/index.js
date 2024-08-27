import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

const healthAdvices = [
    { "id": 1, "advice": "Eat your veggies, or they’ll plot against you." },
    { "id": 2, "advice": "An apple a day keeps anyone away if you throw it hard enough." },
    { "id": 3, "advice": "Don’t skip breakfast; it’s the most important meal you’ll forget to eat." },
    { "id": 4, "advice": "Drink more water; your future self will thank you… and stop dehydrating." },
    { "id": 5, "advice": "Sleep like a baby, but without the crying and diaper changes." },
    { "id": 6, "advice": "Exercise, because zombies don’t eat fast food." },
    { "id": 7, "advice": "Stay hydrated, or you’ll end up as dry as your humor." },
    { "id": 8, "advice": "Laugh more; it’s like jogging for your face." },
    { "id": 9, "advice": "Stretch, because it’s the only way to reach the top shelf snacks." },
    { "id": 10, "advice": "Go outside; the Wi-Fi signal might be weak, but the fresh air is strong." },
    { "id": 11, "advice": "Eat more fiber; your future bathroom breaks will be smoother." },
    { "id": 12, "advice": "Wash your hands like you just chopped jalapeños and need to remove your contacts." },
    { "id": 13, "advice": "Take the stairs; it’s the closest thing to mountain climbing for office workers." },
    { "id": 14, "advice": "Eat your fruits; they’re nature’s candy, minus the wrapper." },
    { "id": 15, "advice": "Practice yoga, because sometimes bending over backwards is the only option." },
    { "id": 16, "advice": "Snack wisely, because no one likes a hangry person." },
    { "id": 17, "advice": "Walk more; your feet won’t mind, but your couch might miss you." },
    { "id": 18, "advice": "Eat slowly, so your stomach can catch up to your mouth’s enthusiasm." },
    { "id": 19, "advice": "Take a nap; even your phone battery needs a break." },
    { "id": 20, "advice": "Dance like no one’s watching… and because it’s cardio." },
    { "id": 21, "advice": "Stay positive; it’s the best exercise for your mind." },
    { "id": 22, "advice": "Don’t stress; wrinkles are harder to iron out than clothes." },
    { "id": 23, "advice": "Eat fish; they’re brain food, but not like zombie brain food." },
    { "id": 24, "advice": "Limit screen time, unless you’re reading this, of course." },
    { "id": 25, "advice": "Floss daily, because food isn’t meant to be saved for later." },
    { "id": 26, "advice": "Take deep breaths; it’s cheaper than therapy." },
    { "id": 27, "advice": "Eat dark chocolate; it’s practically a salad if you squint." },
    { "id": 28, "advice": "Get some sunshine; you’re not a vampire, right?" },
    { "id": 29, "advice": "Drink tea; it’s like a hug in a cup." },
    { "id": 30, "advice": "Brush your teeth; the minty fresh feeling is worth the two minutes." },
    { "id": 31, "advice": "Eat nuts; they’re tiny brain boosters that fit in your pocket." },
    { "id": 32, "advice": "Stay active, so your body doesn’t turn into a permanent chair mold." },
    { "id": 33, "advice": "Listen to music; it’s like a workout for your soul." },
    { "id": 34, "advice": "Read more; your brain needs food too." },
    { "id": 35, "advice": "Stay social; even introverts need a buddy sometimes." },
    { "id": 36, "advice": "Limit sugar; you’re sweet enough already." },
    { "id": 37, "advice": "Take the occasional day off; even superheroes need a break." },
    { "id": 38, "advice": "Keep a journal; it’s cheaper than a therapist." },
    { "id": 39, "advice": "Stay curious; it’s the key to keeping your brain young." },
    { "id": 40, "advice": "Eat avocado; it’s green, creamy, and practically a superpower." },
    { "id": 41, "advice": "Learn to cook; your stomach will thank you." },
    { "id": 42, "advice": "Wear sunscreen; your future self will appreciate it." },
    { "id": 43, "advice": "Don’t hold grudges; they’re bad for your health and your sleep." },
    { "id": 44, "advice": "Stay humble; no one likes a braggart with high cholesterol." },
    { "id": 45, "advice": "Eat your greens; they’re like tiny soldiers fighting off bad vibes." },
    { "id": 46, "advice": "Get your steps in; your step counter needs something to count." },
    { "id": 47, "advice": "Stay organized; your brain likes order, even if your room doesn’t." },
    { "id": 48, "advice": "Drink coffee; it’s liquid optimism." },
    { "id": 49, "advice": "Smile more; it’s the cheapest facelift available." },
    { "id": 50, "advice": "Stay playful; life’s too short to be serious all the time." }
  ]
  
  

app.get('/health-advice', (req, res) => {
  const randomIndex = Math.floor(Math.random() * healthAdvices.length);
  const advice = healthAdvices[randomIndex];
  res.json(advice);
});

const PORT = 4000;

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is running on port ${PORT}`);
  } else {
    console.log("Error: " + error);
  }
});
