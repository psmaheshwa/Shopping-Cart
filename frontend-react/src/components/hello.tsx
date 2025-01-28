import React, { useState, useEffect } from 'react';

type HelloWorldProps = {
  name: string;
};

const HelloWorld: React.FC<HelloWorldProps> = ({ name }) => {
    useEffect(() => {
        console.log('useEffect called');
        // fetchProducts();
        // fetchCart();
      }, []);
  return <h1>Hello, {name}!</h1>;
};

export default HelloWorld;
