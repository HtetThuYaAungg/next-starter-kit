"use client";
import React from "react";
import type {
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Asterisk, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Select, { type SingleValue, type MultiValue, type StylesConfig, components } from "react-select";

export type SelectOption = {
  value: string;
  label: string;
};

interface SelectBoxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseControllerProps<TFieldValues, TName> {
  label?: string;
  options: SelectOption[];
  multiSelect?: boolean;
  searchable?: boolean;
  placeholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
  maxHeight?: number;
  clearable?: boolean;
  isCol?: boolean;
  labelSpan?: number;
  inputSpan?: number;
  mainSpan?: number;
  withAsterisk?: boolean;
  menuPlacement?: "auto" | "bottom" | "top";
  menuPortalTarget?: HTMLElement | null;
  menuShouldBlockScroll?: boolean;
}


// Mapping for common grid configurations
const gridColsMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
}

const colSpanMap: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
}

// Custom styles for react-select to match the existing design
const customSelectStyles: StylesConfig<SelectOption, boolean> = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "36px",
    border: state.isFocused
      ? "1px solid hsl(var(--ring))"
      : "1px solid hsl(var(--border))",
    borderRadius: "6px",
    backgroundColor: state.isDisabled 
      ? "hsl(var(--input) / 0.3)" // dark:bg-input/30 equivalent
      : "hsl(var(--background))",
    boxShadow: state.isFocused ? "0 0 0 2px hsl(var(--ring) / 0.2)" : "none",
    "&:hover": {
      border: state.isDisabled 
        ? "1px solid hsl(var(--border))"
        : "1px solid hsl(var(--ring))",
    },
    cursor: state.isDisabled ? "not-allowed" : "default", // disabled:cursor-not-allowed
    opacity: state.isDisabled ? 0.5 : 1, // disabled:opacity-50
    pointerEvents: state.isDisabled ? "none" : "auto", // disabled:pointer-events-none
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "2px 8px",
  }),
  input: (provided) => ({
    ...provided,
    margin: "0px",
    color: "hsl(var(--foreground))",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    padding: "0 8px",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "hsl(var(--muted-foreground))",
    cursor: "pointer",
    pointerEvents: "auto",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.2s ease",
    "&:hover": {
      color: "hsl(var(--foreground))",
    },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: "hsl(var(--muted-foreground))",
    "&:hover": {
      color: "hsl(var(--foreground))",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "hsl(var(--popover))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "6px",
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)",
    zIndex: 9999,
    position: "absolute",
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 9999,
    position: "fixed",
  }),
  menuList: (provided) => ({
    ...provided,
    padding: "4px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "hsl(var(--primary))"
      : state.isFocused
      ? "hsl(var(--accent))"
      : "transparent",
    color: state.isSelected
      ? "hsl(var(--primary-foreground))"
      : "hsl(var(--foreground))",
    borderRadius: "4px",
    margin: "2px 0",
    padding: "8px 12px",
    cursor: "pointer",
    pointerEvents: "auto",
    zIndex: 10000,
    "&:hover": {
      backgroundColor: state.isSelected
        ? "hsl(var(--primary))"
        : "hsl(var(--accent))",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "hsl(var(--muted-foreground))",
    fontSize: "14px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100%",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "hsl(var(--foreground))",
    fontSize: "14px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100%",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "hsl(var(--secondary))",
    borderRadius: "4px",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "hsl(var(--secondary-foreground))",
    fontSize: "12px",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "hsl(var(--secondary-foreground))",
    "&:hover": {
      backgroundColor: "hsl(var(--destructive))",
      color: "hsl(var(--destructive-foreground))",
    },
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    color: "hsl(var(--muted-foreground))",
    fontSize: "14px",
  }),
};

// Custom DropdownIndicator component to ensure proper click handling
const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown 
        className="h-4 w-4" 
        style={{
          transform: props.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease',
        }}
      />
    </components.DropdownIndicator>
  );
};

export function SelectBox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  options,
  multiSelect = false,
  searchable = false,
  placeholder,
  emptyMessage,
  disabled,
  className,
  maxHeight,
  clearable,
  isCol = false,
  labelSpan = 2,
  inputSpan = 4,
  mainSpan = 6,
  withAsterisk = false,
  menuPlacement = "auto",
  menuPortalTarget,
  menuShouldBlockScroll = false,
}: SelectBoxProps<TFieldValues, TName>) {
  // Get the actual Tailwind classes for the spans
  const labelSpanClass = colSpanMap[labelSpan] || colSpanMap[2];
  const inputSpanClass = colSpanMap[inputSpan] || colSpanMap[4];
  const gridColsClass = gridColsMap[mainSpan] || gridColsMap[6];

  // Handle modal context - find the nearest modal/dialog container
  React.useEffect(() => {
    const findModalContainer = () => {
      let element = document.activeElement;
      while (element && element !== document.body) {
        if (element.getAttribute('role') === 'dialog' || 
            element.classList.contains('modal') ||
            element.classList.contains('dialog') ||
            element.tagName === 'DIALOG') {
          return element as HTMLElement;
        }
        element = element.parentElement;
      }
      return document.body;
    };

    // If no custom portal target is provided, try to find modal container
    if (!menuPortalTarget) {
      const modalContainer = findModalContainer();
      if (modalContainer !== document.body) {
        // We found a modal, but we'll still use document.body for better z-index handling
        // The menuPosition="fixed" should handle positioning correctly
      }
    }
  }, [menuPortalTarget]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            isCol
              ? "flex flex-col"
              : `flex flex-col min-[500px]:grid ${gridColsClass}`,
            className
          )}
        >
          {label && (
            <label
              htmlFor={name}
              className={cn(
                labelSpanClass,
                "text-sm font-normal flex min-[500px]:justify-start items-start  pt-2 gap-1"
              )}
            >
              <p>{label}</p>
              {withAsterisk && (
                <p className="text-xs flex items-center pt-0.5">
                  ({" "}
                  <FormLabel className="pt-0.5">
                    <Asterisk className="h-2.5 w-2.5" />
                  </FormLabel>
                  )
                </p>
              )}
            </label>
          )}
          <div className={cn(inputSpanClass, "relative bg-background")}>
            <FormControl>
              <Select
                value={
                  multiSelect
                    ? options.filter(option => 
                        Array.isArray(field.value) && field.value.includes(option.value)
                      )
                    : options.find(option => option.value === field.value) || null
                }
                onChange={(selectedOption) => {
                  if (multiSelect) {
                    const values = Array.isArray(selectedOption) 
                      ? selectedOption.map(option => option.value)
                      : [];
                    field.onChange(values);
                  } else {
                    const value = selectedOption ? (selectedOption as SelectOption).value : '';
                    field.onChange(value);
                  }
                }}
                onBlur={field.onBlur}
                options={options}
                isMulti={multiSelect}
                isSearchable={searchable}
                placeholder={placeholder || "Select an option"}
                noOptionsMessage={() => emptyMessage || "No options found"}
                isDisabled={disabled}
                isClearable={clearable}
                styles={customSelectStyles}
                className={className}
                maxMenuHeight={maxHeight || 200}
                menuPlacement={menuPlacement}
                closeMenuOnSelect={!multiSelect}
                hideSelectedOptions={false}
                menuPortalTarget={menuPortalTarget || document.body}
                menuPosition="fixed"
                menuShouldBlockScroll={menuShouldBlockScroll}
                menuShouldScrollIntoView={false}
                components={{
                  DropdownIndicator,
                }}
                tabSelectsValue={false}
                backspaceRemovesValue={false}
              />
            </FormControl>
            <FormMessage className="px-2 text-xs" />
          </div>
        </FormItem>
      )}
    />
  );
}
