import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function MedicineCard({ name, description, price, image, onAddToCart }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={image} alt={name} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <h5>{price}</h5>
        <Button variant="success" onClick={onAddToCart}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}
