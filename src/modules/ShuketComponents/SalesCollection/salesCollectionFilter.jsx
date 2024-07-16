import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  appType,
  martType,
  orderType,
  perPagetType,
  statusType,
} from "../Helper/types";
import { useNavigate } from "react-router-dom";

const SalesCollectionFilter = ({
  dataFilter,
  changeDataFilter,
  handleSearch,
  handleReset,
}) => {
  const navigate = useNavigate()
  const gotoAddMartPage = () =>{
    navigate('add-mart')
  }
  return (
    <Card sx={{ mb: 5, borderRadius: 1 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mx: 5, my:4 }}
      >
        <Typography>찾기</Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Button type="button" color="primary" variant="contained" onClick={gotoAddMartPage}>
            신규 마트 추가
          </Button>
          <Button type="button" color="success" variant="outlined">
            엑셀 다운로드
          </Button>
        </Stack>
      </Stack>

      <Divider />
      <CardContent sx={{ mt: 5 }}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={25}
          sx={{ mb: 5 }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <Typography>찾기</Typography>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <Select
                value={dataFilter.keyword_type}
                onChange={(e) =>
                  changeDataFilter({
                    ...dataFilter,
                    keyword_type: e.target.value,
                  })
                }
              >
                {martType.map((ele) => (
                  <MenuItem key={ele.value} value={ele.value}>
                    {ele.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              value={dataFilter.keyword_value}
              onChange={(e) =>
                changeDataFilter({
                  ...dataFilter,
                  keyword_value: e.target.value,
                })
              }
              hiddenLabel
              variant="outlined"
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <Typography>상태</Typography>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <Select
                displayEmpty={true}
                value={dataFilter.status}
                onChange={(e) =>
                  changeDataFilter({ ...dataFilter, status: e.target.value })
                }
              >
                {statusType.map((ele) => (
                  <MenuItem key={ele.value} value={ele.value}>
                    {ele.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <Typography>앱 유형</Typography>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <Select
                displayEmpty={true}
                value={dataFilter.app_type}
                onChange={(e) =>
                  changeDataFilter({ ...dataFilter, app_type: e.target.value })
                }
              >
                {appType.map((ele) => (
                  <MenuItem key={ele.value} value={ele.value}>
                    {ele.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={25}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <Typography>상태</Typography>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <Select
                value={dataFilter.order_by}
                onChange={(e) =>
                  changeDataFilter({ ...dataFilter, order_by: e.target.value })
                }
              >
                {orderType.map((ele) => (
                  <MenuItem key={ele.value} value={ele.value}>
                    {ele.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <Typography>상태</Typography>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <Select
                value={dataFilter.limit}
                onChange={(e) =>
                  changeDataFilter({ ...dataFilter, limit: e.target.value })
                }
              >
                {perPagetType.map((ele) => (
                  <MenuItem key={ele} value={ele}>
                    {ele}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  name="주문 연동 사용"
                  checked={dataFilter.mart_use_sync_order}
                  onChange={(e) =>
                    changeDataFilter({
                      ...dataFilter,
                      mart_use_sync_order: e.target.checked,
                    })
                  }
                />
              }
              label="주문 연동 사용"
            />
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  name="재고 연동 사용"
                  checked={dataFilter.mart_with_stock}
                  onChange={(e) =>
                    changeDataFilter({
                      ...dataFilter,
                      mart_with_stock: e.target.checked,
                    })
                  }
                />
              }
              label="재고 연동 사용"
            />
          </Box>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <Button variant="contained" onClick={handleSearch}>
              찾기
            </Button>
            <Button variant="outlined" color="inherit" onClick={handleReset}>
              취소
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SalesCollectionFilter;
