import { Control, FieldValues } from 'react-hook-form';

export interface __TextAreaProps {
    control: Control<FieldValues, object>;
    name: string;
    title?: string;
    description?: string;
    type?: 'text' | 'number' | 'password';
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}
