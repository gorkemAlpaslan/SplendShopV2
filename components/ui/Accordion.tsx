'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-border last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:text-primary"
            >
                <span className="text-base text-foreground font-serif">{title}</span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden bg-secondary/10"
                    >
                        <div className="pb-4 text-sm text-muted-foreground leading-relaxed px-1">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface AccordionProps {
    items: {
        title: string;
        content: React.ReactNode;
        defaultOpen?: boolean;
    }[];
}

export default function Accordion({ items }: AccordionProps) {
    return (
        <div className="w-full">
            {items.map((item, index) => (
                <AccordionItem key={index} title={item.title} defaultOpen={item.defaultOpen}>
                    {item.content}
                </AccordionItem>
            ))}
        </div>
    );
}
