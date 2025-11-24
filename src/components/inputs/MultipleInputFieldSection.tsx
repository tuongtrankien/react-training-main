import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
  FieldArrayPath,
  FieldArray,
  FieldArrayWithId,
  useWatch,
  Path,
} from "react-hook-form";

type MultipleInputFieldSectionProps<
  TFieldValues extends Record<string, any>,
  TItem extends FieldArray<TFieldValues, FieldArrayPath<TFieldValues>>
> = {
  control: Control<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  name: FieldArrayPath<TFieldValues>;
  label: string;
  defaultItem: TItem;
  children: (
    field: FieldArrayWithId<TFieldValues, FieldArrayPath<TFieldValues>>,
    index: number,
    register: UseFormRegister<TFieldValues>,
    errors: FieldErrors<TFieldValues>
  ) => React.ReactNode;
  renderTotal?: (items: any[]) => React.ReactNode;
};

export default function MultipleInputFieldSection<
  TFieldValues extends Record<string, any>,
  TItem extends FieldArray<TFieldValues, FieldArrayPath<TFieldValues>>
>({
  control,
  register,
  errors,
  name,
  label,
  defaultItem,
  children,
  renderTotal,
}: MultipleInputFieldSectionProps<TFieldValues, TItem>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const values = useWatch({control, name: name as Path<TFieldValues>}) as TItem[];

  return (
    <div className="panel mb-6">
      <h4 className="text-md font-semibold mb-4">{label}</h4>
      {fields.map((field, index) => (
        <div key={index} className="mb-4 p-4 border rounded-md">
          {children(field, index, register, errors)}
          {fields.length > 1 && (
            <button 
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded-md"
                onClick={() => remove(index)}>
                Remove
            </button>
          )}
        </div>
      ))}
      <button 
        type="button" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded-md"
        onClick={() => append(defaultItem)}>
            Add {label}
      </button>
      {renderTotal && renderTotal(values)}
    </div>
  );
}