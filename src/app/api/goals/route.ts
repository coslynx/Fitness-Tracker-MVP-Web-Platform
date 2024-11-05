import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { createGoal, getGoals, updateGoal, deleteGoal } from '@/services/api'; 

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!; 
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const userId = req.session.user?.id; 

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'GET') {
        try {
            const goals = await getGoals(userId); 
            return res.status(200).json(goals);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to fetch goals' });
        }
    } else if (req.method === 'POST') {
        try {
            const goalData = req.body; 
            const newGoal = await createGoal(userId, goalData);
            return res.status(201).json(newGoal);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to create goal' });
        }
    } else if (req.method === 'PUT') {
        try {
            const goalId = parseInt(req.query.id as string, 10);
            const goalData = req.body; 
            const updatedGoal = await updateGoal(userId, goalId, goalData);
            return res.status(200).json(updatedGoal);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to update goal' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const goalId = parseInt(req.query.id as string, 10);
            await deleteGoal(userId, goalId);
            return res.status(204).end(); 
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to delete goal' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
};