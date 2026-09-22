import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      User.deleteMany({}),
      Team.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.create([
      {
        name: 'Summit Striders',
        description: 'A steady team focused on endurance and consistency.',
        color: '#1f7a8c',
      },
      {
        name: 'Core Collective',
        description: 'Strength-minded athletes building durable routines.',
        color: '#e07a5f',
      },
    ]);

    const users = await User.create([
      { name: 'Maya Chen', email: 'maya.chen@example.com', teamId: teams[0]._id },
      { name: 'Jordan Brooks', email: 'jordan.brooks@example.com', teamId: teams[0]._id },
      { name: 'Priya Shah', email: 'priya.shah@example.com', teamId: teams[1]._id },
      { name: 'Noah Williams', email: 'noah.williams@example.com', teamId: teams[1]._id },
    ]);

    await Activity.create([
      { userId: users[0]._id, type: 'run', durationMinutes: 42, distanceMiles: 4.6, calories: 465, recordedAt: new Date('2026-09-20T07:30:00Z') },
      { userId: users[1]._id, type: 'ride', durationMinutes: 55, distanceMiles: 12.4, calories: 520, recordedAt: new Date('2026-09-19T17:15:00Z') },
      { userId: users[2]._id, type: 'strength', durationMinutes: 38, calories: 310, recordedAt: new Date('2026-09-20T18:00:00Z') },
      { userId: users[3]._id, type: 'walk', durationMinutes: 30, calories: 180, recordedAt: new Date('2026-09-18T12:00:00Z') },
    ]);

    await Leaderboard.create([
      { userId: users[0]._id, points: 1280, rank: 1, period: 'weekly' },
      { userId: users[2]._id, points: 1145, rank: 2, period: 'weekly' },
      { userId: users[1]._id, points: 980, rank: 3, period: 'weekly' },
      { userId: users[3]._id, points: 760, rank: 4, period: 'weekly' },
    ]);

    await Workout.create([
      {
        title: 'Morning Momentum',
        category: 'Cardio',
        difficulty: 'beginner',
        durationMinutes: 25,
        exercises: ['Brisk walk', 'High knees', 'Standing lunges'],
      },
      {
        title: 'Full-Body Foundation',
        category: 'Strength',
        difficulty: 'intermediate',
        durationMinutes: 40,
        exercises: ['Goblet squat', 'Push-ups', 'Bent-over row', 'Plank'],
      },
      {
        title: 'Power Intervals',
        category: 'Conditioning',
        difficulty: 'advanced',
        durationMinutes: 35,
        exercises: ['Burpees', 'Mountain climbers', 'Jump squats', 'Sprint intervals'],
      },
    ]);

    console.log('Seeded users, teams, activities, leaderboard, and workouts');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
