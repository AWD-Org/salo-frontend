import { NextRequest, NextResponse } from 'next/server';
import { signUp } from '@/lib/auth-helpers';
import { signupSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = signupSchema.parse(body);
    
    // Create the user
    const result = await signUp({
      email: validatedData.email,
      password: validatedData.password,
      name: validatedData.name,
    });
    
    if (result.error) {
      return NextResponse.json(
        { message: result.error },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        message: 'Usuario creado exitosamente',
        user: result.data 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { message: 'Datos inválidos', errors: error },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
