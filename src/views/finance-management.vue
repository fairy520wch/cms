<template>
  <div>
    <h1>财务管理</h1>
    <el-button type="primary" @click="openDialog">新增记录</el-button>
    <el-table :data="records" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="amount" label="金额" width="180"></el-table-column>
      <el-table-column prop="description" label="描述" width="180"></el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button @click="editRecord(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="deleteRecord(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="isEdit ? '编辑记录' : '新增记录'" v-model="dialogVisible">
      <el-form :model="form">
        <el-form-item label="日期">
          <el-date-picker v-model="form.date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model="form.amount"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveRecord">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="finance-management">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

const records = ref([]);
const dialogVisible = ref(false);
const isEdit = ref(false);
const form = ref({
  date: '',
  amount: '',
  description: '',
});

const fetchRecords = async () => {
  try {
    const response = await fetch('/api/finance-records');
    const data = await response.json();
    records.value = data;
  } catch (error) {
    ElMessage.error('Failed to fetch financial records');
  }
};

const openDialog = () => {
  isEdit.value = false;
  form.value = { date: '', amount: '', description: '' };
  dialogVisible.value = true;
};

const editRecord = (record) => {
  isEdit.value = true;
  form.value = { ...record };
  dialogVisible.value = true;
};

const saveRecord = async () => {
  try {
    if (isEdit.value) {
      // Update record
      await fetch(`/api/finance-records/${form.value.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value),
      });
    } else {
      // Add new record
      await fetch('/api/finance-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value),
      });
    }
    fetchRecords();
    dialogVisible.value = false;
    ElMessage.success('Record saved successfully');
  } catch (error) {
    ElMessage.error('Failed to save record');
  }
};

const deleteRecord = async (record) => {
  try {
    await fetch(`/api/finance-records/${record.id}`, { method: 'DELETE' });
    fetchRecords();
    ElMessage.success('Record deleted successfully');
  } catch (error) {
    ElMessage.error('Failed to delete record');
  }
};

onMounted(() => {
  fetchRecords();
});
</script>

<style scoped>
</style>