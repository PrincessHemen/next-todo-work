import { NextResponse } from 'next/server';
import { ConnectDB } from '../lib/config/db';

export async function GET(request: Request) {
    try {
        await ConnectDB(); // Ensure this is called when you want to connect to MongoDB
        return NextResponse.json({ message: 'This is a GET request' });
    } catch (error) {
        if (error instanceof Error) {
            console.error('GET request error:', error.message);
            return NextResponse.json({ message: 'Failed to connect to MongoDB', error: error.message }, { status: 500 });
        } else {
            console.error('Unexpected error:', error);
            return NextResponse.json({ message: 'An unexpected error occurred', error: String(error) }, { status: 500 });
        }
    }
}
