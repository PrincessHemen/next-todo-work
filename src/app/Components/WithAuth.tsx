// src/app/components/WithAuth.tsx
"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/Firebase';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return function WithAuth(props: any) {
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.push('/login'); // Redirect to login if not authenticated
        }
      });

      return () => unsubscribe();
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
