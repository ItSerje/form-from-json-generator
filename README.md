# Form-From-Json Generator

This app built using ReactJS, Typescript, [Formik](https://www.npmjs.com/package/formik) and [Yup](https://www.npmjs.com/package/yup) demonstrates generation of forms from json. Served json is validated using predefined Yup schema. Errors in json structure, if any, are displayed, so that you know what is wrong. If json contains any form validation rules, they are also generated dynamically using Yup.

## Deployed App

[form-from-json.netlify.app](https://form-from-json.netlify.app/)

You can donwload json sample, modify it and upload again to generate your custom form.

## Technical Requirements

Create generator of custom forms based on fields described in json (array of objects).

For each field pass a component name, label, placeholder, validations and othe required data.

Ensure json schema validation in order to prevent app failure not just in the process of rendering, but also during form filling.

## Json Schema

General validations include unknown keys detection as well as value type checking. Some properties may be required.

### Root Schema

At the root level the shema is as follows:

```jsonc
{
  "formLabel": "string",
  "btnText": "string",
  "fields": "array" // of objects, each object represents a form field, see below
}
```

### Field Schema

Single field schema includes some general properties as well as componentSpecific:

```jsonc
{
  "component": "string", // may contain one of the following values 'TextInput', 'NumberInput', 'Select', 'Checkbox', 'CheckboxGroup', 'MultipleInputs', 'UploadInput'
  "name": "string", // field names must be unique
  "label": "string",
  "placeholder": "string", // you can specify a placeholder for some field types
  "hint": "string", // a hint text for users
  "initialValue": "mixed", // depends on field value type
  "requiredLabel": "boolean", // if "true" an asterisk will be added to the label
  "validationType": "string", // may contain one of the following values 'string', 'number', 'array', 'boolean', which represent form field value types
  "validations": "array", // of objects, see below
  "componentSpecific": "object" // containing component (field) specific settings, see below
}
```

### Validations Schema

"validations" is an array of objects. Each object represents one validation type and should contain "type" (some yup validation types are accepted) and "params" - an array with 1 or 2 values, i.e. a parameter and message. See the example below.

```jsonc
{
  "validations": [
    { "type": "required", "params": ["Required field"] },
    { "type": "min", "params": [18, "Minimum age for submitting: ${min}"] }
  ]
}
```

Yup interpolations, such as ${min}, ${max} are supported for messages.

Also you can use nested validations. For example, you can validate array length as well as array values. Use "innerType" as validation "type", then specify "validationType" and "validations" in "params":

```jsonc
{
  "type": "innerType",
  "params": {
    "validationType": "string",
    "validations": "array" // of objects, same "validations" schema as above
  }
}
```

### componentSpecific Schema

Component specific settings can be passed in for certain components:

#### Select

```jsonc
{
  "componentSpecific": {
    "required": true,
    "options": [
      { "value": "", "label": "Please select an option" },
      { "value": "single", "label": "Single" },
      { "value": "married", "label": "Married" }
    ]
  }
}
```

You can specify an empty value with some label text as a default option. If the field is required, a user will be prompted to select an option with some value.

#### CheckboxGroup

```jsonc
{
  "componentSpecific": {
    "selectAll": true, // add this if you want to add Select All checkbox
    "selectAllText": "Select All", // add this to use custom text for Select All label
    "options": [
      { "value": "programming", "checkboxLabel": "Programming" },
      { "value": "cooking", "checkboxLabel": "Cooking" },
      { "value": "hiking", "checkboxLabel": "Hiking" },
      { "value": "singing", "checkboxLabel": "Singing" },
      { "value": "driving", "checkboxLabel": "Driving" }
    ]
  }
}
```

You can add some validations like this:

```jsonc
{
  "validationType": "array",
  "validations": [
    {
      "type": "required",
      "params": ["Required field"]
    },
    {
      "type": "min",
      "params": [2, "Minimum ${min} skills are required"]
    }
  ]
}
```

#### Checkbox

If you only need a single checkbox, use the following schema:

```jsonc
{
  "componentSpecific": {
    "checkboxLabel": "I accept all the terms and conditions"
  }
}
```

In order to make this checkbox required add the following validation:

```jsonc
{
  "validationType": "boolean",
  "validations": [
    {
      "type": "oneOf",
      "params": [[true], "This field is required"]
    }
  ]
}
```

#### UploadInput

```jsonc
{
  "componentSpecific": {
    "acceptedFormats": {
      // simple file format validation based on mime type and file extension is supported, however it is possible to cheat, for example by changing file extension. For such cases, it is supposed that a deep validation based on actual file content is provided on server-side.
      "application/json": [".json"], // some basic formats are added to the schema, such as image, text, video, audio
      "image/png": [".png"],
      "image/jpg": [".jpg"]
    },
    "maximumFileSize": 0.5, // in Mb
    "multiple": true, // "true" to enable multiple files selection
    "preview": true, // "true" for image preview ("multiple" should be set to "true")
    "dropzoneText": "Drag 'n' drop some files here, or click to select files"
  }
}
```

You can validate the number of uploaded files like this:

```jsonc
{
  "validationType": "array",
  "validations": [{ "type": "max", "params": [2, "Maximum ${max} files"] }]
}
```
