// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { onMessage, sendMessage } from "webext-bridge/background";
import mixpanel from "mixpanel-browser";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { Tabs } from "webextension-polyfill";
import "./urlBlock";
import { MIXPANEL_TOKEN } from "~/logic/constants";

mixpanel.init(MIXPANEL_TOKEN, {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
});

// only on dev mode
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  // eslint-disable-next-line import/no-unresolved
  import("@vite/client");
  // load latest content script
  import("./contentScriptHMR");
}

browser.runtime.onInstalled.addListener((): void => {
  console.log("Extension installed");
});

let previousTabId = 0;

// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
browser.tabs.onActivated.addListener(async ({ tabId }: { tabId: number }) => {
  if (!previousTabId) {
    previousTabId = tabId;
    return;
  }

  let tab: Tabs.Tab;

  try {
    tab = await browser.tabs.get(previousTabId);
    previousTabId = tabId;
  } catch {
    return;
  }

  console.log("previous tab", tab);
  sendMessage(
    "tab-prev",
    { title: tab.title },
    { context: "content-script", tabId }
  );
});

onMessage("get-current-tab", async () => {
  try {
    const tab = await browser.tabs.get(previousTabId);
    return {
      title: tab?.title,
    };
  } catch {
    return {
      title: undefined,
    };
  }
});

// 内存监控功能：每2秒打印一次background script的内存使用情况
function startMemoryMonitoring() {
  const startTime = Date.now();
  let memoryCheckCount = 0;

  const printMemoryUsage = () => {
    memoryCheckCount += 1;
    const now = Date.now();
    const runtimeSeconds = Math.floor((now - startTime) / 1000);

    // 使用performance.memory API获取JS堆内存信息（Chrome特有）
    if (typeof performance !== "undefined" && "memory" in performance) {
      const memory = (performance as any).memory;
      console.log("🔍 Background Script JS Memory Info:", {
        usedJSHeapSize: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(
          2
        )} MB`,
        totalJSHeapSize: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(
          2
        )} MB`,
        jsHeapSizeLimit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(
          2
        )} MB`,
        memoryUsagePercentage: `${(
          (memory.usedJSHeapSize / memory.jsHeapSizeLimit) *
          100
        ).toFixed(2)}%`,
        timestamp: new Date().toLocaleString(),
        runtimeSeconds,
        checkCount: memoryCheckCount,
      });
    } else {
      // 备用方案：打印详细的运行时信息
      const memInfo = {
        timestamp: new Date().toLocaleString(),
        runtimeSeconds,
        checkCount: memoryCheckCount,
        performanceNow: `${Math.floor(performance.now())} ms`,
        approximateMemoryUsage: "Estimated by runtime duration",
        note: "Performance.memory API not available",
      };

      // 尝试估算内存使用情况（基于运行时间）
      if (runtimeSeconds > 0) {
        memInfo.approximateMemoryUsage = `Base + ${Math.floor(
          runtimeSeconds * 0.1
        )} KB (estimated)`;
      }

      console.log("🔍 Background Script Runtime Info:", memInfo);
    }
  };

  // 立即执行一次
  printMemoryUsage();

  // 每2秒执行一次
  setInterval(printMemoryUsage, 2000);

  console.log("✅ Memory monitoring started - reporting every 2 seconds");
}

// 内存压力测试：每1秒创建10MB字符串数据
const memoryTestData: string[] = [];
let memoryTestMB = 0;

function startMemoryStressTest() {
  const createLargeString = (sizeInMB: number) => {
    // 创建指定大小的随机字符串（1个字符 = 2字节 in UTF-16）
    const charsNeeded = (sizeInMB * 1024 * 1024) / 2;
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    let result = "";

    for (let i = 0; i < charsNeeded; i += 1) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  };

  const addMemoryData = () => {
    try {
      const largeString = createLargeString(10); // 10MB
      memoryTestData.push(largeString);
      console.log(
        "🚀 Memory Stress Test: memoryTestData.length",
        memoryTestData.length,
        "largeString",
        largeString.length
      );
      memoryTestMB += 10;

      console.log("🚀 Memory Stress Test:", {
        action: "Added 10MB data",
        totalAllocatedMB: memoryTestMB,
        arrayLength: memoryTestData.length,
        timestamp: new Date().toLocaleString(),
      });

      // 如果有performance.memory，打印实际内存使用
      if (typeof performance !== "undefined" && "memory" in performance) {
        const memory = (performance as any).memory;
        console.log("💾 Actual Memory Usage:", {
          usedJSHeapSize: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(
            2
          )} MB`,
          totalJSHeapSize: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(
            2
          )} MB`,
          memoryUsagePercentage: `${(
            (memory.usedJSHeapSize / memory.jsHeapSizeLimit) *
            100
          ).toFixed(2)}%`,
        });
      }
    } catch (error) {
      console.error("❌ Memory allocation failed:", {
        error: error instanceof Error ? error.message : String(error),
        totalAllocatedMB: memoryTestMB,
        timestamp: new Date().toLocaleString(),
      });

      // 达到内存限制时停止测试
      console.log("🛑 Memory stress test stopped due to allocation failure");
      return false;
    }
    return true;
  };

  console.log("🧪 Starting memory stress test - adding 10MB every 1 second");

  // 立即执行一次
  if (addMemoryData()) {
    // 每1秒执行一次，直到内存分配失败
    const interval = setInterval(() => {
      if (!addMemoryData()) {
        clearInterval(interval);
      }
    }, 1000);
  }
}

// 启动内存监控
// startMemoryMonitoring();

// 启动内存压力测试
// startMemoryStressTest();
