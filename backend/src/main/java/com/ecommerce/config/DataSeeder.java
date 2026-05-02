package com.ecommerce.config;

import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) {
        if (productRepository.count() == 0) {
            // Electronics
            productRepository.save(new Product("Sony WH-1000XM5 Headphones",
                "Industry-leading noise canceling with Dual Noise Sensor technology. Up to 30-hour battery life.",
                349.99, "Electronics",
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", 45, 4.8, 2341, true));

            productRepository.save(new Product("Apple MacBook Air M2",
                "Supercharged by M2 chip, the new MacBook Air has a 13.6-inch Liquid Retina display and up to 18 hours battery.",
                1199.99, "Electronics",
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500", 20, 4.9, 1876, true));

            productRepository.save(new Product("Samsung 4K OLED TV 55\"",
                "Experience breathtaking picture quality with Samsung OLED technology. Quantum HDR and Object Tracking Sound.",
                899.99, "Electronics",
                "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500", 15, 4.7, 943, false));

            productRepository.save(new Product("iPad Pro 12.9-inch",
                "The ultimate iPad experience with M2 chip, Liquid Retina XDR display, and Apple Pencil support.",
                1099.99, "Electronics",
                "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500", 30, 4.8, 654, false));

            productRepository.save(new Product("Canon EOS R50 Camera",
                "Compact mirrorless camera with 24.2MP sensor, dual pixel autofocus, and 4K video recording.",
                679.99, "Electronics",
                "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500", 18, 4.6, 387, false));

            // Clothing
            productRepository.save(new Product("Premium Leather Jacket",
                "Genuine full-grain leather jacket with quilted lining. Classic biker style meets modern sophistication.",
                289.99, "Clothing",
                "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500", 60, 4.5, 521, true));

            productRepository.save(new Product("Organic Cotton Hoodie",
                "100% GOTS certified organic cotton. Heavyweight fleece for ultimate warmth and comfort.",
                79.99, "Clothing",
                "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=500", 120, 4.4, 892, false));

            productRepository.save(new Product("Slim Fit Chinos",
                "Tailored slim fit trousers in stretch cotton blend. Perfect for smart-casual occasions.",
                59.99, "Clothing",
                "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500", 85, 4.3, 445, false));

            productRepository.save(new Product("Running Sneakers Pro",
                "Lightweight performance running shoe with energy-return foam midsole and breathable mesh upper.",
                129.99, "Clothing",
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", 70, 4.6, 1203, true));

            // Home & Kitchen
            productRepository.save(new Product("Nespresso Vertuo Coffee Machine",
                "Brew the perfect coffee with Centrifusion technology. Compatible with all Vertuo capsules.",
                199.99, "Home & Kitchen",
                "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500", 40, 4.7, 3421, true));

            productRepository.save(new Product("KitchenAid Stand Mixer",
                "Professional 5-quart stand mixer with 10 speeds. Includes flat beater, dough hook, and wire whip.",
                449.99, "Home & Kitchen",
                "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=500", 25, 4.9, 2187, true));

            productRepository.save(new Product("Bamboo Cutting Board Set",
                "Set of 3 premium bamboo cutting boards with juice grooves. Eco-friendly and knife-friendly surface.",
                39.99, "Home & Kitchen",
                "https://images.unsplash.com/photo-1606502973842-f64bc2785fe5?w=500", 150, 4.5, 678, false));

            productRepository.save(new Product("Instant Pot Duo 7-in-1",
                "7-in-1 multi-use pressure cooker. Replaces 7 kitchen appliances — pressure cooker, slow cooker, rice cooker and more.",
                89.99, "Home & Kitchen",
                "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500", 55, 4.8, 5621, false));

            // Books
            productRepository.save(new Product("Clean Code by Robert Martin",
                "A handbook of agile software craftsmanship. Learn to write cleaner, more maintainable code.",
                34.99, "Books",
                "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500", 200, 4.7, 4532, false));

            productRepository.save(new Product("Atomic Habits by James Clear",
                "An Easy and Proven Way to Build Good Habits and Break Bad Ones. #1 New York Times bestseller.",
                24.99, "Books",
                "https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?w=500", 300, 4.9, 8921, true));

            productRepository.save(new Product("The Pragmatic Programmer",
                "Your Journey to Mastery. From journeyman to master — 20th Anniversary Edition, fully revised.",
                44.99, "Books",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500", 180, 4.8, 2341, false));

            // Sports
            productRepository.save(new Product("Yoga Mat Premium",
                "Thick 6mm non-slip yoga mat with alignment lines. Eco-friendly TPE material, includes carry strap.",
                49.99, "Sports",
                "https://images.unsplash.com/photo-1601925228010-9c5fdb8592ff?w=500", 90, 4.6, 1234, false));

            productRepository.save(new Product("Adjustable Dumbbell Set",
                "Space-saving adjustable dumbbells from 5 to 52.5 lbs. Replace 15 sets of weights.",
                299.99, "Sports",
                "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=500", 35, 4.8, 876, true));
        }
    }
}
