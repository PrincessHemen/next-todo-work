import { NextResponse, NextRequest } from 'next/server';
import { ConnectDB } from '../lib/config/db';
import TodoModel from '../lib/models/TodoModel';

export async function GET(request: Request) {
    try {
        await ConnectDB(); 
        // Ensure this is called when you want to connect to MongoDB
        const todos = await TodoModel.find({}); 
        // Fetch all todos from the database
        return NextResponse.json({ todos }); 
        // Return the todos in the response
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

export async function POST(request: Request) {
  try {
      await ConnectDB(); 
      const { title, description, userId } = await request.json(); // Destructure userId

      console.log('Received userId:', userId);

      if (!userId) {
          console.log('No userId provided');
          return NextResponse.json({ message: 'userId is required' }, { status: 400 });
      }

      await TodoModel.create({ title, description, userId }); // Pass userId when creating a new Todo

      return NextResponse.json({ msg: 'ToDo Created' });
  } catch (error) {
      if (error instanceof Error) {
          console.error('POST ToDo request error:', error.message);
          return NextResponse.json({ message: 'Failed to connect to MongoDB', error: error.message }, { status: 500 });
      } else {
          console.error('Unexpected error posting ToDo:', error);
          return NextResponse.json({ message: 'An unexpected error occurred', error: String(error) }, { status: 500 });
      }
  }
}



export async function DELETE(request: NextRequest) { // Change Request to NextRequest
    try {
        await ConnectDB(); 
        // Ensure this is called when you want to connect to MongoDB
        
        const mongoId = request.nextUrl.searchParams.get('mongoId'); 
        // nextUrl is a property of NextRequest
        
        if (!mongoId) {
            return NextResponse.json({ message: 'Missing MongoDB ID' }, { status: 400 });
        }
        
        const deletedTodo = await TodoModel.findByIdAndDelete(mongoId);
        
        if (!deletedTodo) {
            return NextResponse.json({ message: 'ToDo not found' }, { status: 404 });
        }

        return NextResponse.json({ msg: "ToDo Deleted" });
    } catch (error) {
        if (error instanceof Error) {
            console.error('DELETE ToDo request error:', error.message);
            return NextResponse.json({ message: 'Failed to delete ToDo', error: error.message }, { status: 500 });
        } else {
            console.error('Unexpected error deleting ToDo:', error);
            return NextResponse.json({ message: 'An unexpected error occurred', error: String(error) }, { status: 500 });
        }
    }
}

export async function PUT(request: NextRequest) {
    try {
        await ConnectDB();
        
        const mongoId = request.nextUrl.searchParams.get('mongoId');
        
        if (!mongoId) {
            return NextResponse.json({ message: 'Missing MongoDB ID' }, { status: 400 });
        }
        
        const updatedTodo = await TodoModel.findByIdAndUpdate(mongoId, {
            $set: {
                status: 'Completed', // Update the status to 'Completed'
            }
        });

        if (!updatedTodo) {
            return NextResponse.json({ message: 'ToDo not found' }, { status: 404 });
        }

        return NextResponse.json({ msg: "ToDo Completed" });
    } catch (error) {
        if (error instanceof Error) {
            console.error('PUT ToDo request error:', error.message);
            return NextResponse.json({ message: 'Failed to update ToDo', error: error.message }, { status: 500 });
        } else {
            console.error('Unexpected error updating ToDo:', error);
            return NextResponse.json({ message: 'An unexpected error occurred', error: String(error) }, { status: 500 });
        }
    }
}