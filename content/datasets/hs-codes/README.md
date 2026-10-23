# 美妆日化海关编码数据集（HS / 本国税号）

面向「同舟跨境·远山频道」合规页与内容维护。**禁止编造税号或税率**；核验不了的字段保持空，并在 `other_tax_notes` 说明。

## 文件

| 文件 | 说明 |
| --- | --- |
| `beauty.json` | 权威数据集（含全部字段与核验状态） |
| `beauty.csv` | 同上表格版，便于 Excel 打开 |
| 本 README | 更新流程 |

工作区完整产物（xlsx、原始抓取）在 agent 侧 `/workspace/hs-codes/`，**不入库**。

## 覆盖国家

`ru` 俄罗斯/EAEU、`id` 印尼、`my` 马来、`th` 泰国、`vn` 越南、`ph` 菲律宾、`sg` 新加坡、`ae` 阿联酋、`sa` 沙特、`cn` 中国出口侧（退税率）。

泰国目前为 **code_only**（AHTN 8 位可展示，MFN 关税未从泰国 ITD 核验）。中国仅在本数据集，无单独 `/compliance/cn` 页。

## `verification` 取值

- `verified_official`：官方税则/海关站点
- `verified_secondary`：权威汇编或官方镜像
- `code_only`：仅编码确认、税率未核验
- `unverified`：未核验

## 如何更新

1. 用免费官方源核验目标国税率（菲律宾 Tariff Finder、马来 JKDM ezHS、印尼 PMK/BTKI、新加坡海关、GCC 统一税则 PDF、越南法令汇编、EAEU ТН ВЭД、中国 hsbianma/税务总局退税率文库等）。
2. 在 agent 工作区跑重建脚本，或直接改 `beauty.json` 对应行的 `national_code` / `import_duty` / `source_url` / `verification` / `verified_date`。
3. 同步写入各 `content/compliance/<cc>.json` 的 `hs_codes`（见下方同步规则）。
4. `npm run validate:content` → 提交 `main`（宝塔约 5 分钟拉 `deploy`）。

### 同步到合规页

`hs_codes.status`：有可用 `national_code` 的条目时设为 `ready`，否则 `pending`。

每条 `hs_codes.items[]`：

```json
{ "code": "33049930", "name_zh": "面霜/乳液/精华（护肤）", "duty": "15%", "source_url": "https://..." }
```

- `duty`：进口 MFN；中国出口侧可写 `退税 13%`。
- 税率未核验时省略 `duty`，不要填猜测值。

## 声明

税率随法令变更；通关以目的国海关归类与原产地证书为准。本数据集仅供卖家初筛参考。
