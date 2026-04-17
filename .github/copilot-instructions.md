## ⚙️ Vue3 + TypeScript (Strict Rules)

### 🧩 Composition API

- Prefer Composition API over Options API
- Extract reusable logic into composables (`useXXX`)
- Avoid placing too much logic inside components
- Keep setup() clean and readable

---

### 🧠 Reactivity Rules

- Use `ref` for primitive values, `reactive` for objects
- Avoid deep nested reactive objects (can cause performance issues)
- Do NOT destructure reactive objects directly (will lose reactivity)
- Use `toRefs` when necessary

Bad:
const { name } = reactiveUser

Good:
const { name } = toRefs(reactiveUser)

---

### 🔐 Type Safety (Critical)

- Avoid `any` at all costs
- Define clear interfaces/types for:
  - API responses
  - Props
  - Emits
- Use `unknown` instead of `any` when necessary
- Use generics for reusable components

---

### 📦 Props & Emits

- Always define props with types

Good:
const props = defineProps<{
  userId: string
  amount: number
}>()

- Validate emits

Good:
const emit = defineEmits<{
  (e: 'submit', payload: FormData): void
}>()

---

### 🔄 Lifecycle & Logic

- Avoid abusing `watch`
- Prefer:
  - `computed` for derived state
  - `watchEffect` for auto tracking

- Ensure watchers:
  - Have clear dependencies
  - Avoid infinite loops

---

### 🚀 Performance Optimization

- Use `defineAsyncComponent` for lazy loading
- Avoid unnecessary reactive dependencies
- Use `v-memo` / `v-once` where applicable
- Avoid inline functions in template (causes re-render)

Bad:
@click="() => handleClick(item)"

---

### 🧱 Component Design

- Keep components:
  - Small
  - Focused
  - Reusable

- Follow:
  - Container (logic) vs Presentational (UI)

- Avoid:
  - God components (超过300行要警惕)

---

### 📡 API Handling

- Do NOT call API directly inside template
- Centralize API logic (e.g., `/api` or `/services`)
- Always:
  - handle loading state
  - handle error state

---

### 🔑 State Management (Pinia)

- Use store for shared state only
- Avoid putting all logic into store
- Split stores by domain

Bad:
userStore handles everything

Good:
userStore / orderStore / authStore

---

### 🧪 Code Smell Detection

Flag if:
- Component > 300 lines
- Too many props (>10)
- Deep nesting (>3 levels)
- Repeated logic (should extract composable)

---

### 🧼 Template Best Practices

- Avoid complex expressions in template
- Move logic to script
- Use computed instead of inline logic

Bad:
{{ price * count * discount }}

Good:
const totalPrice = computed(() => ...)

---

### 📁 Project Structure (Recommended)

- /components (通用组件)
- /views (页面)
- /composables (逻辑复用)
- /stores (Pinia)
- /services (API)
- /types (类型定义)

---

### 🚫 Strictly Forbidden

- Using `any`
- Direct DOM manipulation (unless necessary)
- Business logic inside template
- Hardcoded values (should be constants/config)

---

### 🧠 Review Focus (Vue3)

When reviewing Vue code, pay extra attention to:
- Reactivity correctness
- Component reusability
- Type safety
- Performance risks
