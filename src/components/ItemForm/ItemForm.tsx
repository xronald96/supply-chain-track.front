// src/components/ItemForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { createItem, updateItem } from "../../services/itemService";

interface ItemFormProps {
  isUpdating?: boolean;
  initialValues?: { name: string; color: string; price: number; id?: string };
  onItemCreated?: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({
  isUpdating = false,
  initialValues = { id: "", name: "", color: "", price: 0 },
  onItemCreated,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
  });

  const onSubmit = async (data: any) => {
    try {
      if (isUpdating && initialValues.id) {
        await updateItem(initialValues.id, data.name, data.color, data.price);
      } else {
        await createItem(data.name, data.color, data.price);
      }
      reset(); 
      if (onItemCreated) onItemCreated(); 
    } catch (err) {
      console.error("Error saving item", err);
    }
  };

  return (
    <div>
      <h2>{isUpdating ? "Update Item" : "Create Item"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: "Item name is required" })}
          placeholder="Item Name"
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

        <input
          {...register("color", { required: "Item color is required" })}
          placeholder="Item Color"
        />
        {errors.color && <p style={{ color: "red" }}>{errors.color.message}</p>}

        <input
          type="number"
          {...register("price", {
            required: "Item price is required",
            valueAsNumber: true,
          })}
          placeholder="Item Price"
        />
        {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}

        <button type="submit">
          {isUpdating ? "Update Item" : "Create Item"}
        </button>
      </form>
    </div>
  );
};

export default ItemForm;
