<template>
  <div>
    <h1>商品管理</h1>
    <el-button type="primary" @click="openDialog">新增商品</el-button>
    <el-table :data="products" style="width: 100%">
      <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="price" label="价格" width="180"></el-table-column>
      <el-table-column prop="category" label="分类" width="180"></el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button @click="editProduct(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="deleteProduct(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="isEdit ? '编辑商品' : '新增商品'" v-model="dialogVisible">
      <el-form :model="form">
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-input v-model="form.category"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveProduct">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="product-management">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

const products = ref([]);
const dialogVisible = ref(false);
const isEdit = ref(false);
const form = ref({
  name: '',
  price: '',
  category: '',
});

const fetchProducts = async () => {
  try {
    const response = await fetch('/api/products');
    const data = await response.json();
    products.value = data;
  } catch (error) {
    ElMessage.error('Failed to fetch product data');
  }
};

const openDialog = () => {
  isEdit.value = false;
  form.value = { name: '', price: '', category: '' };
  dialogVisible.value = true;
};

const editProduct = (product) => {
  isEdit.value = true;
  form.value = { ...product };
  dialogVisible.value = true;
};

const saveProduct = async () => {
  try {
    if (isEdit.value) {
      // Update product
      await fetch(`/api/products/${form.value.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value),
      });
    } else {
      // Add new product
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value),
      });
    }
    fetchProducts();
    dialogVisible.value = false;
    ElMessage.success('Product saved successfully');
  } catch (error) {
    ElMessage.error('Failed to save product');
  }
};

const deleteProduct = async (product) => {
  try {
    await fetch(`/api/products/${product.id}`, { method: 'DELETE' });
    fetchProducts();
    ElMessage.success('Product deleted successfully');
  } catch (error) {
    ElMessage.error('Failed to delete product');
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
</style>