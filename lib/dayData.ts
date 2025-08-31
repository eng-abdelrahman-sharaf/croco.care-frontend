// Data for each day, including workouts and meals
// Valid images and videos are used for demo purposes

export interface Workout {
    id: number;
    name: string;
    sets: string;
    reps: string;
    muscleGroup: string;
    image: string;
    duration: string;
    calories: number;
    description: string;
    steps: string[];
    videoUrl: string;
}

export interface Meal {
    id: number;
    name: string;
    duration: string;
    calories: number;
    description: string;
    ingredients: string[];
    steps: string[];
    image: string;
}

export interface DayData {
    workouts: Workout[];
    meals: Meal[];
}

// Demo images and videos from public/ and royalty-free sources
const workoutFillers: Workout[] = [
    {
        id: 1,
        name: "Flat Bench Press",
        sets: "3",
        reps: "10",
        muscleGroup: "Chest",
        image: "https://images.unsplash.com/photo-1690731033723-ad718c6e585a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVuY2glMjBwcmVzc3xlbnwwfHwwfHx8MA%3D%3D",
        duration: "45 mins",
        calories: 250,
        description:
            "A fundamental chest exercise that targets the pectoralis major",
        steps: [
            "Lie flat on the bench with feet firmly on the ground",
            "Grip the bar with hands slightly wider than shoulder-width",
            "Lower the bar to your chest with control",
            "Press the bar back up to starting position",
        ],
        videoUrl: "https://www.youtube.com/embed/gRVjAtPip0Y",
    },
    {
        id: 2,
        name: "Squats",
        sets: "4",
        reps: "12",
        muscleGroup: "Legs",
        image: "https://images.unsplash.com/photo-1590771998996-8589ec9b5ac6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNxdWF0fGVufDB8fDB8fHww",
        duration: "40 mins",
        calories: 300,
        description: "Compound exercise targeting quadriceps, glutes, and core",
        steps: [
            "Stand with feet shoulder-width apart",
            "Lower your body by bending knees and hips",
            "Keep chest up and back straight",
            "Return to starting position",
        ],
        videoUrl: "https://www.youtube.com/embed/q1fCgfieNEs",
    },
    {
        id: 3,
        name: "Push-ups",
        sets: "3",
        reps: "15",
        muscleGroup: "Chest",
        image: "https://images.unsplash.com/photo-1598971457999-ca4ef48a9a71?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVzaHVwc3xlbnwwfHwwfHx8MA%3D%3D",
        duration: "30 mins",
        calories: 180,
        description: "Bodyweight exercise for chest, shoulders, and triceps",
        steps: [
            "Start in plank position with hands shoulder-width apart",
            "Lower your body until chest nearly touches the floor",
            "Push back up to starting position",
            "Keep your body in a straight line throughout",
        ],
        videoUrl: "https://www.youtube.com/embed/_l3ySVKYVJ8",
    },
];

const mealFillers: Meal[] = [
    {
        id: 1,
        name: "Pasta with Meatballs",
        duration: "30 mins",
        calories: 700,
        description:
            "High-protein pasta dish perfect for post-workout recovery",
        ingredients: [
            "Whole wheat pasta",
            "Lean ground beef",
            "Tomato sauce",
            "Parmesan cheese",
        ],
        steps: [
            "Cook pasta according to package instructions",
            "Form meatballs and cook in a pan",
            "Add tomato sauce and simmer",
            "Combine with pasta and serve",
        ],
        image: "https://plus.unsplash.com/premium_photo-1664478291780-0c67f5fb15e6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVhdGJhbGxzfGVufDB8fDB8fHww",
    },
    {
        id: 2,
        name: "Grilled Chicken Salad",
        duration: "20 mins",
        calories: 450,
        description: "Light, protein-rich meal with fresh vegetables",
        ingredients: [
            "Chicken breast",
            "Mixed greens",
            "Cherry tomatoes",
            "Olive oil",
        ],
        steps: [
            "Grill chicken breast until cooked through",
            "Prepare mixed greens and vegetables",
            "Slice chicken and add to salad",
            "Drizzle with olive oil dressing",
        ],
        image: "https://plus.unsplash.com/premium_photo-1695399566183-df3e7778e198?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JpbGxlZCUyMGNoaWNrZW4lMjBzYWxhZHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        id: 3,
        name: "Protein Smoothie",
        duration: "10 mins",
        calories: 350,
        description: "Quick protein-rich breakfast smoothie",
        ingredients: [
            "Protein powder",
            "Banana",
            "Almond milk",
            "Spinach",
            "Berries",
        ],
        steps: [
            "Add all ingredients to blender",
            "Blend until smooth",
            "Pour into glass and serve immediately",
        ],
        image: "https://plus.unsplash.com/premium_photo-1663853294058-3f85f18a4bed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvdGVpbiUyMHNtb290aGllfGVufDB8fDB8fHww",
    },
];

const workoutDaysToFill = [3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26, 29];
const daysInMonthForMeals = 31;

export const dayData: Record<number, DayData> = {};
for (let day = 1; day <= daysInMonthForMeals; day++) {
    dayData[day] = {
        workouts: workoutDaysToFill.includes(day)
            ? [workoutFillers[(day - 3) % workoutFillers.length]]
            : [],
        meals: [mealFillers[(day - 1) % mealFillers.length]],
    };
}
